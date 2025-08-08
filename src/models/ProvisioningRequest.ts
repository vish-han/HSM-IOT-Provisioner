export interface ProvisioningRequest {
  id: string;
  clientId: string;
  deviceSerialNumber: string;
  publicKey: string;
  status: ProvisioningStatus;
  requestedAt: Date;
  processedAt?: Date;
  certificate?: string;
  errorMessage?: string;
  operatorId: string;
}

export enum ProvisioningStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface ProvisioningRequestInput {
  deviceSerialNumber: string;
  publicKey: string;
  operatorId: string;
  metadata?: Record<string, any>;
}
