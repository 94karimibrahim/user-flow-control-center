
import { User } from "@/types/user";
import { v4 as uuidv4 } from "uuid";

export const users: User[] = [
  {
    id: uuidv4(),
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "admin",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=alex",
    department: "Engineering",
    joined: "2023-01-15",
    lastActive: "2025-04-16"
  },
  {
    id: uuidv4(),
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "manager",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    department: "Marketing",
    joined: "2023-03-22",
    lastActive: "2025-04-15"
  },
  {
    id: uuidv4(),
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "user",
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?u=michael",
    department: "Sales",
    joined: "2023-05-10",
    lastActive: "2025-03-28"
  },
  {
    id: uuidv4(),
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "user",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=emily",
    department: "Customer Support",
    joined: "2023-07-08",
    lastActive: "2025-04-16"
  },
  {
    id: uuidv4(),
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "guest",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?u=david",
    department: "Finance",
    joined: "2023-09-15",
    lastActive: null
  }
];
