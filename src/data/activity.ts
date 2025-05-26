
import { UserActivity, UserSession, UserStats, AuditLog, SystemStats } from "@/types/activity";
import { users } from "./users";

export const userActivities: UserActivity[] = [
  {
    id: "1",
    userId: users[0].id,
    action: "login",
    details: "Successful login",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2025-05-26T08:30:00Z"
  },
  {
    id: "2",
    userId: users[1].id,
    action: "login",
    details: "Successful login",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: "2025-05-26T09:15:00Z"
  },
  {
    id: "3",
    userId: users[0].id,
    action: "profile_update",
    details: "Updated department from Engineering to Senior Engineering",
    timestamp: "2025-05-26T10:45:00Z",
    performedBy: users[0].id
  },
  {
    id: "4",
    userId: users[2].id,
    action: "role_change",
    details: "Role changed from user to manager",
    timestamp: "2025-05-26T11:20:00Z",
    performedBy: users[0].id
  },
  {
    id: "5",
    userId: users[3].id,
    action: "login",
    details: "Successful login",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
    timestamp: "2025-05-26T12:00:00Z"
  }
];

export const userSessions: UserSession[] = [
  {
    id: "1",
    userId: users[0].id,
    loginTime: "2025-05-26T08:30:00Z",
    lastActivity: "2025-05-26T12:45:00Z",
    isActive: true,
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: "2",
    userId: users[1].id,
    loginTime: "2025-05-26T09:15:00Z",
    lastActivity: "2025-05-26T12:30:00Z",
    isActive: true,
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
  },
  {
    id: "3",
    userId: users[3].id,
    loginTime: "2025-05-26T12:00:00Z",
    lastActivity: "2025-05-26T12:50:00Z",
    isActive: true,
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15"
  }
];

export const userStats: UserStats[] = users.map(user => ({
  userId: user.id,
  totalLogins: Math.floor(Math.random() * 50) + 10,
  lastLogin: user.lastActive,
  totalSessionTime: Math.floor(Math.random() * 1000) + 100,
  averageSessionTime: Math.floor(Math.random() * 60) + 15,
  isCurrentlyActive: userSessions.some(session => session.userId === user.id && session.isActive)
}));

export const auditLogs: AuditLog[] = [
  {
    id: "1",
    entityType: "user",
    entityId: users[0].id,
    action: "update",
    oldValues: { department: "Engineering" },
    newValues: { department: "Senior Engineering" },
    performedBy: users[0].id,
    performedByName: users[0].name,
    timestamp: "2025-05-26T10:45:00Z",
    description: "User updated their department"
  },
  {
    id: "2",
    entityType: "user",
    entityId: users[2].id,
    action: "update",
    oldValues: { role: "user" },
    newValues: { role: "manager" },
    performedBy: users[0].id,
    performedByName: users[0].name,
    timestamp: "2025-05-26T11:20:00Z",
    description: "Admin changed user role from user to manager"
  },
  {
    id: "3",
    entityType: "user",
    entityId: users[4].id,
    action: "create",
    newValues: {
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "guest",
      status: "pending"
    },
    performedBy: users[0].id,
    performedByName: users[0].name,
    timestamp: "2025-05-25T14:30:00Z",
    description: "New user created"
  },
  {
    id: "4",
    entityType: "user",
    entityId: users[1].id,
    action: "update",
    oldValues: { status: "pending" },
    newValues: { status: "active" },
    performedBy: users[0].id,
    performedByName: users[0].name,
    timestamp: "2025-05-25T16:15:00Z",
    description: "User status changed from pending to active"
  }
];

export const systemStats: SystemStats = {
  totalUsers: users.length,
  activeUsers: userSessions.filter(session => session.isActive).length,
  totalLogins: userStats.reduce((sum, stat) => sum + stat.totalLogins, 0),
  averageSessionTime: userStats.reduce((sum, stat) => sum + stat.averageSessionTime, 0) / userStats.length,
  newUsersThisMonth: 3,
  mostActiveUsers: userStats
    .sort((a, b) => b.totalLogins - a.totalLogins)
    .slice(0, 5)
    .map(stat => {
      const user = users.find(u => u.id === stat.userId);
      return {
        userId: stat.userId,
        userName: user?.name || "Unknown",
        loginCount: stat.totalLogins
      };
    })
};
