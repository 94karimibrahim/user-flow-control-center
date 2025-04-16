
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { users as initialUsers } from "@/data/users";
import { User } from "@/types/user";
import { UserForm } from "@/components/users/UserForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/users/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteUserDialog } from "@/components/users/DeleteUserDialog";
import { ChevronLeft, Clock, Calendar, UserRound, Building } from "lucide-react";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const foundUser = initialUsers.find(u => u.id === id);
    if (foundUser) {
      setUser(foundUser);
    } else {
      toast.error("User not found");
      navigate("/users");
    }
  }, [id, navigate]);

  if (!user) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  const handleDeleteUser = () => {
    toast.success(`User ${user.name} deleted successfully`);
    navigate("/users");
  };

  const handleUpdateUser = (userData: any) => {
    const updatedUser = {
      ...user,
      ...userData
    };
    setUser(updatedUser);
    setIsEditing(false);
    toast.success("User updated successfully");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const userRole = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  return (
    <div className="container mx-auto py-10">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 hover:bg-transparent"
        onClick={() => navigate("/users")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Users
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl mb-1">{user.name}</CardTitle>
                <CardDescription className="text-sm mb-2">{user.email}</CardDescription>
                <StatusBadge status={user.status} className="mb-2" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserRound className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Role:</span>
                  <span className="text-sm font-medium">{userRole}</span>
                </div>
                {user.department && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mr-2">Department:</span>
                    <span className="text-sm font-medium">{user.department}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Joined:</span>
                  <span className="text-sm font-medium">
                    {new Date(user.joined).toLocaleDateString()}
                  </span>
                </div>
                {user.lastActive && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mr-2">Last active:</span>
                    <span className="text-sm font-medium">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete User
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue={isEditing ? "edit" : "activity"}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>
                    View recent activity and actions taken by this user
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                    <p>No activity data available for this user</p>
                    <p className="mt-2 text-sm">Activity tracking will be implemented in a future update</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="edit" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>
                    Update user details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserForm 
                    user={user} 
                    onSubmit={handleUpdateUser} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <DeleteUserDialog
        user={user}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default UserProfile;
