
import { Role } from "@/types/user";
import { v4 as uuidv4 } from "uuid";

export const roles: Role[] = [
  {
    id: uuidv4(),
    name: "admin",
    description: "Full access to all system features and settings",
    permissions: [
      "users.view",
      "users.create",
      "users.edit",
      "users.delete",
      "roles.view",
      "roles.create", 
      "roles.edit",
      "roles.delete",
      "settings.view",
      "settings.edit"
    ],
    usersCount: 3,
    createdAt: "2023-01-10",
    updatedAt: "2025-03-15"
  },
  {
    id: uuidv4(),
    name: "manager",
    description: "Access to manage users and view reports",
    permissions: [
      "users.view",
      "users.create",
      "users.edit",
      "roles.view",
      "settings.view"
    ],
    usersCount: 8,
    createdAt: "2023-01-12",
    updatedAt: "2025-02-20"
  },
  {
    id: uuidv4(),
    name: "user",
    description: "Standard user access to basic features",
    permissions: [
      "profile.view",
      "profile.edit"
    ],
    usersCount: 42,
    createdAt: "2023-01-15",
    updatedAt: "2024-12-10"
  },
  {
    id: uuidv4(),
    name: "guest",
    description: "Limited read-only access to public content",
    permissions: [
      "profile.view"
    ],
    usersCount: 17,
    createdAt: "2023-02-05",
    updatedAt: "2024-11-30"
  }
];
