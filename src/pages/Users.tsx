
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/types/user";
import { users as initialUsers } from "@/data/users";
import { UserTable } from "@/components/users/UserTable";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { NotificationBell } from "@/components/notifications/NotificationBell";

const Users = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleAddUser = (userData: Omit<User, "id" | "joined" | "lastActive">) => {
    const newUser: User = {
      id: uuidv4(),
      ...userData,
      joined: new Date().toISOString().split("T")[0],
      lastActive: null,
    };

    setUsers([...users, newUser]);
    toast.success("User added successfully");
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User deleted successfully");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage users and their access to the platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <AddUserDialog onUserAdded={handleAddUser} />
        </div>
      </div>
      
      <UserTable data={users} onDelete={handleDeleteUser} />
    </div>
  );
};

export default Users;
