export interface HSMInterface {
  initialize(): Promise<void>;
  generateKeyPair(keyId: string): Promise<{ publicKey: string; keyHandle: string }>;
  signData(keyHandle: string, data: Buffer): Promise<Buffer>;
  generateCertificate(publicKey: string, deviceId: string, serialNumber: string): string;
  isAvailable(): boolean;
  getStatus(): HSMStatus;
}

export interface HSMStatus {
  isInitialized: boolean;
  isAvailable: boolean;
  currentLoad: number;
  lastOperation: Date | null;
}

export interface HSMOperation {
  id: string;
  type: HSMOperationType;
  parameters: any;
  resolve: (result: any) => void;
  reject: (error: Error) => void;
  timestamp: Date;
}

export enum HSMOperationType {
  GENERATE_KEY_PAIR = 'generate_key_pair',
  SIGN_DATA = 'sign_data',
  GENERATE_CERTIFICATE = 'generate_certificate'
}
