
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { User, Team, ApiKey, AccessRequest } from "@/types/user";
import { users as initialUsers } from "@/data/users";
import { teams as initialTeams } from "@/data/teams";
import { apiKeys as initialApiKeys } from "@/data/apiKeys";
import { accessRequests as initialAccessRequests } from "@/data/accessRequests";
import { UserTable } from "@/components/users/UserTable";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { UserActivityDashboard } from "@/components/users/UserActivityDashboard";
import { ActiveUsersList } from "@/components/users/ActiveUsersList";
import { UserStatistics } from "@/components/users/UserStatistics";
import { AuditLog } from "@/components/users/AuditLog";
import { TeamsManagement } from "@/components/teams/TeamsManagement";
import { ApiKeyManagement } from "@/components/api/ApiKeyManagement";
import { AccessRequestManagement } from "@/components/access/AccessRequestManagement";
import { BulkOperations } from "@/components/users/BulkOperations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Users = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>(initialAccessRequests);

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

  const handleImportUsers = (importedUsers: User[]) => {
    setUsers([...users, ...importedUsers]);
    toast.success(`Imported ${importedUsers.length} users successfully`);
  };

  const handleCreateTeam = (teamData: Omit<Team, "id" | "createdAt" | "updatedAt">) => {
    const newTeam: Team = {
      id: uuidv4(),
      ...teamData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTeams([...teams, newTeam]);
    toast.success("Team created successfully");
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
    toast.success("Team deleted successfully");
  };

  const handleCreateApiKey = (apiKeyData: Omit<ApiKey, "id" | "key" | "createdAt">) => {
    const newApiKey: ApiKey = {
      id: uuidv4(),
      key: `ak_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      ...apiKeyData,
      createdAt: new Date().toISOString(),
    };

    setApiKeys([...apiKeys, newApiKey]);
    toast.success("API key created successfully");
  };

  const handleDeleteApiKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
    toast.success("API key deleted successfully");
  };

  const handleToggleApiKey = (keyId: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? { ...key, isActive: !key.isActive } : key
    ));
    toast.success("API key status updated");
  };

  const handleApproveRequest = (requestId: string, comment?: string) => {
    setAccessRequests(accessRequests.map(request =>
      request.id === requestId ? {
        ...request,
        status: "approved" as const,
        reviewedBy: "current-user",
        reviewedAt: new Date().toISOString(),
        comments: comment,
      } : request
    ));
  };

  const handleRejectRequest = (requestId: string, comment: string) => {
    setAccessRequests(accessRequests.map(request =>
      request.id === requestId ? {
        ...request,
        status: "rejected" as const,
        reviewedBy: "current-user",
        reviewedAt: new Date().toISOString(),
        comments: comment,
      } : request
    ));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Flow Control Center</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive platform for managing users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <AddUserDialog onUserAdded={handleAddUser} />
        </div>
      </div>

      <UserActivityDashboard />
      
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="access-requests">Access Requests</TabsTrigger>
          <TabsTrigger value="bulk-ops">Bulk Operations</TabsTrigger>
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

        <TabsContent value="teams">
          <TeamsManagement 
            teams={teams}
            onCreateTeam={handleCreateTeam}
            onDeleteTeam={handleDeleteTeam}
          />
        </TabsContent>

        <TabsContent value="api-keys">
          <ApiKeyManagement
            apiKeys={apiKeys}
            onCreateApiKey={handleCreateApiKey}
            onDeleteApiKey={handleDeleteApiKey}
            onToggleApiKey={handleToggleApiKey}
          />
        </TabsContent>

        <TabsContent value="access-requests">
          <AccessRequestManagement
            accessRequests={accessRequests}
            onApproveRequest={handleApproveRequest}
            onRejectRequest={handleRejectRequest}
          />
        </TabsContent>

        <TabsContent value="bulk-ops">
          <BulkOperations
            users={users}
            onImportUsers={handleImportUsers}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
