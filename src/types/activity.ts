
export interface UserActivity {
  id: string;
  userId: string;
  action: "login" | "logout" | "profile_update" | "role_change" | "status_change" | "password_change";
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  performedBy?: string; // ID of user who performed the action (for admin actions)
}

export interface UserSession {
  id: string;
  userId: string;
  loginTime: string;
  lastActivity: string;
  isActive: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserStats {
  userId: string;
  totalLogins: number;
  lastLogin: string | null;
  totalSessionTime: number; // in minutes
  averageSessionTime: number; // in minutes
  isCurrentlyActive: boolean;
}

export interface AuditLog {
  id: string;
  entityType: "user" | "role" | "permission";
  entityId: string;
  action: "create" | "update" | "delete" | "assign" | "revoke";
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  performedBy: string;
  performedByName: string;
  timestamp: string;
  description: string;
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalLogins: number;
  averageSessionTime: number;
  newUsersThisMonth: number;
  mostActiveUsers: Array<{
    userId: string;
    userName: string;
    loginCount: number;
  }>;
}
