
export type NotificationType = "info" | "success" | "warning" | "error";

export type NotificationCategory = "user" | "role" | "system" | "security";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionText?: string;
  userId?: string;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  categories: {
    user: boolean;
    role: boolean;
    system: boolean;
    security: boolean;
  };
}
