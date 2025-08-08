import { HSMInterface,HSMStatus, HSMOperationType } from "../../interface/HSMInterface";
import { logger } from "../../utils/logger";
import crypto, { KeyPairKeyObjectResult } from "crypto"

export class MockHSM implements HSMInterface {
  private initialized = false;
  private available = true;
  private lastOperation: Date | null = null;
  private keyStore: Map<string,KeyPairKeyObjectResult> = new Map();
async initialize():Promise<void> {
    logger.info("MockHSM initializing");
    this.initialized=true;
    logger.info('Mock HSM initialized successfully');
}

async generateKeyPair(keyId: string): Promise<{ publicKey: string; keyHandle: string; }> {
   logger.info(`Generating key pair for keyId: ${keyId}`);

   const keyPair=crypto.generateKeyPairSync("rsa",{
     modulusLength: 2048,
     publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
   })

   this.keyStore.set(keyId,keyPair);
   this.lastOperation=new Date()

   return {
    publicKey:keyPair.publicKey,
    keyHandle:keyId
   }
}
 async signData(keyHandle: string, data: Buffer): Promise<Buffer> {
    this.validateAvailability();
    
    const keyPair = this.keyStore.get(keyHandle);
    if (!keyPair) {
      throw new Error(`Key not found for handle: ${keyHandle}`);
    }

    await this.delay(1500);

    const signature = crypto.sign('sha256', data, keyPair.privateKey);
    this.lastOperation = new Date();

    return signature;
  }

generateCertificate(publicKey: string, deviceId: string, serialNumber: string): string {
    logger.info(`Generating Certificate for the devide ${deviceId}`)
    this.delay(1000);

      const certificate = {
      version: '1.0',
      serialNumber,
      deviceId,
      publicKey,
      issuer: 'MockHSM CA',
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      signature: this.generateMockSignature(publicKey + deviceId + serialNumber)
    };

    this.lastOperation = new Date();
    return JSON.stringify(certificate);

}
 isAvailable(): boolean {
    return this.initialized && this.available;
  }

  getStatus(): HSMStatus {
    return {
      isInitialized: this.initialized,
      isAvailable: this.available,
      currentLoad: 0, 
      lastOperation: this.lastOperation
    };
  }

private validateAvailability(): void {
    if (!this.initialized) {
      throw new Error('HSM not initialized');
    }
    if (!this.available) {
      throw new Error('HSM not available');
    }
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


private generateMockSignature(data:string):string{
return crypto.createHash("sha256").update(data).digest("hex");
} 
}
