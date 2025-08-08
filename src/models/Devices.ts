export interface Device {
  id: string;
  deviceId: string;
  publicKey: string;
  certificate: string;
  serialNumber: string;
  manufacturingDate: Date;
  provisionedAt: Date;
  provisionedBy: string;
  status: DeviceStatus;
  metadata?: Record<string, any>;
}

export enum DeviceStatus {
  PENDING = 'pending',
  PROVISIONED = 'provisioned',
  REVOKED = 'revoked',
  EXPIRED = 'expired'
}

export interface DeviceIdentity {
  deviceId: string;
  publicKey: string;
  privateKey: string; 
  certificate: string;
  serialNumber: string;
}
