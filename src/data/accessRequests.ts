
import { AccessRequest } from "@/types/user";
import { v4 as uuidv4 } from "uuid";

export const accessRequests: AccessRequest[] = [
  {
    id: uuidv4(),
    userId: "user3",
    requestedPermissions: ["users.create", "users.edit"],
    requestedRoles: ["manager"],
    reason: "I need to manage user accounts for my team as I've been promoted to team lead",
    status: "pending",
    requestedBy: "user3",
    createdAt: "2025-04-15T09:00:00Z",
  },
  {
    id: uuidv4(),
    userId: "user4",
    requestedPermissions: ["settings.view", "settings.edit"],
    requestedRoles: [],
    reason: "Need access to system settings to configure integrations for our department",
    status: "approved",
    requestedBy: "user4",
    reviewedBy: "user1",
    reviewedAt: "2025-04-14T14:30:00Z",
    comments: "Approved for limited settings access. Please coordinate with admin team.",
    createdAt: "2025-04-12T11:15:00Z",
  },
  {
    id: uuidv4(),
    userId: "user5",
    requestedPermissions: ["roles.create", "roles.edit"],
    requestedRoles: ["admin"],
    reason: "Requesting admin access to help with user management during busy period",
    status: "rejected",
    requestedBy: "user5",
    reviewedBy: "user1",
    reviewedAt: "2025-04-13T16:45:00Z",
    comments: "Admin access requires additional approval process. Please contact HR first.",
    createdAt: "2025-04-10T13:20:00Z",
  }
];
