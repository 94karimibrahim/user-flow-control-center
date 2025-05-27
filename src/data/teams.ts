
import { Team } from "@/types/user";
import { v4 as uuidv4 } from "uuid";

export const teams: Team[] = [
  {
    id: uuidv4(),
    name: "Engineering Team",
    description: "Software development and technical implementation",
    members: ["user1", "user2", "user3"],
    roles: ["admin", "manager"],
    createdAt: "2023-01-15",
    updatedAt: "2025-04-10",
  },
  {
    id: uuidv4(),
    name: "Marketing Team",
    description: "Product marketing and customer acquisition",
    members: ["user2", "user4"],
    roles: ["manager", "user"],
    createdAt: "2023-02-20",
    updatedAt: "2025-03-28",
  },
  {
    id: uuidv4(),
    name: "Sales Team",
    description: "Customer relations and revenue generation",
    members: ["user3", "user5"],
    roles: ["user"],
    createdAt: "2023-03-10",
    updatedAt: "2025-04-05",
  }
];
