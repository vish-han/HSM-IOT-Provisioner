import { HSMInterface, HSMOperation, HSMOperationType } from '../../interface/HSMInterface';
import { logger } from '../../utils/logger';

export class HSMQueue {
  private queue: HSMOperation[] = [];
  private processing = false;
  private hsm: HSMInterface;

  constructor(hsm: HSMInterface) {
    this.hsm = hsm;
  }

  async enqueue<T>(type: HSMOperationType, parameters: any): Promise<T> {
    return new Promise((resolve, reject) => {
      const operation: HSMOperation = {
        id: this.generateOperationId(),
        type,
        parameters,
        resolve,
        reject,
        timestamp: new Date()
      };

      this.queue.push(operation);
      logger.info(`HSM operation queued: ${operation.id} (${type})`);
      
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const operation = this.queue.shift()!;
      
      try {
        logger.info(`Processing HSM operation: ${operation.id} (${operation.type})`);
        const result = await this.executeOperation(operation);
        operation.resolve(result);
        logger.info(`HSM operation completed: ${operation.id}`);
      } catch (error) {
        logger.error(`HSM operation failed: ${operation.id}`, error);
        operation.reject(error as Error);
      }
    }

    this.processing = false;
  }

  private async executeOperation(operation: HSMOperation): Promise<any> {
    switch (operation.type) {
      case HSMOperationType.GENERATE_KEY_PAIR:
        return await this.hsm.generateKeyPair(operation.parameters.keyId);
      
      case HSMOperationType.SIGN_DATA:
        return await this.hsm.signData(operation.parameters.keyHandle, operation.parameters.data);
      
      case HSMOperationType.GENERATE_CERTIFICATE:
        return await this.hsm.generateCertificate(
          operation.parameters.publicKey,
          operation.parameters.deviceId,
          operation.parameters.serialNumber
        );
      
      default:
        throw new Error(`Unsupported HSM operation type: ${operation.type}`);
    }
  }

  private generateOperationId(): string {
    return `hsm_op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  isProcessing(): boolean {
    return this.processing;
  }
}
