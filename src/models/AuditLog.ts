export interface AuditLog {
  id: string;
  eventType: AuditEventType;
  entityId: string;
  entityType: string;
  userId: string;
  details: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

export enum AuditEventType {
  DEVICE_PROVISIONED = 'device_provisioned',
  DEVICE_REVOKED = 'device_revoked',
  ADMIN_LOGIN = 'admin_login',
  ADMIN_LOGOUT = 'admin_logout',
  PROVISIONING_REQUEST_CREATED = 'provisioning_request_created',
  PROVISIONING_REQUEST_PROCESSED = 'provisioning_request_processed',
  HSM_OPERATION = 'hsm_operation',
  SYSTEM_ERROR = 'system_error'
}
