
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Role } from "@/types/user";
import { roles as initialRoles } from "@/data/roles";
import { RoleForm } from "@/components/roles/RoleForm";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ChevronLeft, ShieldPlus } from "lucide-react";

const CreateRole = () => {
  const navigate = useNavigate();
  
  const handleCreateRole = (role: Role) => {
    // In a real app, this would send the data to an API
    // For now, we'll just show a success message and navigate back to the roles list
    console.log("Created role:", role);
    toast.success("Role created successfully!");
    navigate("/roles");
  };

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/roles">Roles</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Create Role</BreadcrumbPage>
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

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldPlus className="h-8 w-8 text-purple-600" />
            Create New Role
          </h1>
          <p className="text-muted-foreground mt-1">
            Define a new role with specific permissions for your users
          </p>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <RoleForm onSubmit={handleCreateRole} />
      </div>
    </div>
  );
};

export default CreateRole;
