
import { Notification, NotificationPreferences } from "@/types/notification";

export const notifications: Notification[] = [
  {
    id: "1",
    title: "New User Added",
    message: "John Doe has been added to the system with Admin role",
    type: "success",
    category: "user",
    isRead: false,
    createdAt: "2024-01-15T10:30:00Z",
    actionUrl: "/users/john-doe-id",
    actionText: "View User"
  },
  {
    id: "2",
    title: "Role Permissions Updated",
    message: "Manager role permissions have been modified",
    type: "info",
    category: "role",
    isRead: false,
    createdAt: "2024-01-15T09:15:00Z",
    actionUrl: "/roles/manager-id",
    actionText: "View Role"
  },
  {
    id: "3",
    title: "Security Alert",
    message: "Multiple failed login attempts detected for user admin@example.com",
    type: "warning",
    category: "security",
    isRead: true,
    createdAt: "2024-01-14T16:45:00Z"
  },
  {
    id: "4",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight at 2 AM EST",
    type: "info",
    category: "system",
    isRead: false,
    createdAt: "2024-01-14T14:20:00Z"
  },
  {
    id: "5",
    title: "User Deleted",
    message: "User Jane Smith has been removed from the system",
    type: "error",
    category: "user",
    isRead: true,
    createdAt: "2024-01-13T11:30:00Z"
  }
];

export const defaultNotificationPreferences: NotificationPreferences = {
  userId: "current-user",
  emailNotifications: true,
  pushNotifications: false,
  categories: {
    user: true,
    role: true,
    system: true,
    security: true,
  }
};
