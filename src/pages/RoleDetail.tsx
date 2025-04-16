
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { roles as initialRoles } from "@/data/roles";
import { Role } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeleteRoleDialog } from "@/components/roles/DeleteRoleDialog";
import { Home, ChevronLeft, ShieldCheck, Users, Calendar, CheckCircle } from "lucide-react";

const RoleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const foundRole = initialRoles.find(r => r.id === id);
    if (foundRole) {
      setRole(foundRole);
    } else {
      toast.error("Role not found");
      navigate("/roles");
    }
  }, [id, navigate]);

  if (!role) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  const handleDeleteRole = () => {
    toast.success(`Role ${role.name} deleted successfully`);
    navigate("/roles");
  };

  const getRoleColorClass = (roleName: string) => {
    switch (roleName) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-slate-100 text-slate-800";
      case "guest":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/roles">Roles</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage className="capitalize">{role.name}</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:bg-transparent"
        onClick={() => navigate("/roles")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Roles
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge className={`${getRoleColorClass(role.name)} capitalize mb-2`}>
                  {role.name}
                </Badge>
                <ShieldCheck className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-2xl mb-1 capitalize">{role.name} Role</CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Users with this role:</span>
                  <span className="text-sm font-medium">{role.usersCount}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Created:</span>
                  <span className="text-sm font-medium">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Last updated:</span>
                  <span className="text-sm font-medium">
                    {new Date(role.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => navigate(`/roles/${role.id}/edit`)}
              >
                Edit Role
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Role
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="permissions">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="permissions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Role Permissions</CardTitle>
                  <CardDescription>
                    Permissions granted to users with the {role.name} role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {role.permissions.map((permission) => (
                      <div 
                        key={permission} 
                        className="flex items-center p-2 rounded-md bg-gray-50 border border-gray-100"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{permission}</span>
                      </div>
                    ))}
                    {role.permissions.length === 0 && (
                      <p className="text-muted-foreground col-span-full text-center py-8">No permissions assigned</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Users with this Role</CardTitle>
                  <CardDescription>
                    Users that are currently assigned the {role.name} role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <p>{role.usersCount} users with this role</p>
                    <p className="mt-2 text-sm">Detailed user listing will be implemented in a future update</p>
                    <Button className="mt-4" variant="outline" asChild>
                      <Link to="/users">Go to User Management</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <DeleteRoleDialog
        role={role}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteRole}
      />
    </div>
  );
};

export default RoleDetail;
