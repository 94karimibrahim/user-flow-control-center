
export type UserRole = "admin" | "manager" | "user" | "guest";

export type UserStatus = "active" | "inactive" | "pending" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  department?: string;
  joined: string;
  lastActive?: string;
  mfaEnabled?: boolean;
  ipWhitelist?: string[];
  accessExpiry?: string;
  teamIds?: string[];
}

export interface Role {
  id: string;
  name: UserRole;
  description: string;
  permissions: string[];
  usersCount: number;
  createdAt: string;
  updatedAt: string;
  hierarchy?: number;
  isTemporary?: boolean;
  expiresAt?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
  roles: string[];
  createdAt: string;
  updatedAt: string;
  departmentId?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  userId: string;
  scopes: string[];
  expiresAt?: string;
  lastUsed?: string;
  isActive: boolean;
  rateLimit?: number;
  createdAt: string;
}

export interface AccessRequest {
  id: string;
  userId: string;
  requestedPermissions: string[];
  requestedRoles: string[];
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestedBy: string;
  reviewedBy?: string;
  reviewedAt?: string;
  comments?: string;
  createdAt: string;
}

export interface UserSession {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  loginTime: string;
  lastActivity: string;
  isActive: boolean;
  location?: string;
}
