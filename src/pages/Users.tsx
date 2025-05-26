
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/types/user";
import { users as initialUsers } from "@/data/users";
import { UserTable } from "@/components/users/UserTable";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { UserActivityDashboard } from "@/components/users/UserActivityDashboard";
import { ActiveUsersList } from "@/components/users/ActiveUsersList";
import { UserStatistics } from "@/components/users/UserStatistics";
import { AuditLog } from "@/components/users/AuditLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <UserActivityDashboard />
      
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UserTable data={users} onDelete={handleDeleteUser} />
        </TabsContent>
        
        <TabsContent value="activity">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActiveUsersList />
            <UserStatistics />
          </div>
        </TabsContent>
        
        <TabsContent value="statistics">
          <div className="grid grid-cols-1 gap-6">
            <UserStatistics />
          </div>
        </TabsContent>
        
        <TabsContent value="audit">
          <AuditLog />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
