
import { ApiKey } from "@/types/user";
import { v4 as uuidv4 } from "uuid";

export const apiKeys: ApiKey[] = [
  {
    id: uuidv4(),
    name: "Production API",
    key: "ak_prod_1234567890abcdef1234567890abcdef",
    userId: "user1",
    scopes: ["users.view", "users.create", "roles.view"],
    expiresAt: "2025-12-31T23:59:59Z",
    lastUsed: "2025-04-15T10:30:00Z",
    isActive: true,
    rateLimit: 1000,
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: uuidv4(),
    name: "Development API",
    key: "ak_dev_abcdef1234567890abcdef1234567890",
    userId: "user2",
    scopes: ["users.view", "profile.view", "profile.edit"],
    lastUsed: "2025-04-14T15:45:00Z",
    isActive: true,
    rateLimit: 500,
    createdAt: "2025-02-15T12:00:00Z",
  },
  {
    id: uuidv4(),
    name: "Legacy Integration",
    key: "ak_legacy_9876543210fedcba9876543210fedcba",
    userId: "user1",
    scopes: ["audit.view"],
    expiresAt: "2025-06-30T23:59:59Z",
    isActive: false,
    rateLimit: 100,
    createdAt: "2024-12-01T09:00:00Z",
  }
];
