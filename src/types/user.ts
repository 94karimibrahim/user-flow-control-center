
export type UserRole = "admin" | "manager" | "user" | "guest";

export type UserStatus = "active" | "inactive" | "pending";

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
}

export interface Role {
  id: string;
  name: UserRole;
  description: string;
  permissions: string[];
  usersCount: number;
  createdAt: string;
  updatedAt: string;
}
