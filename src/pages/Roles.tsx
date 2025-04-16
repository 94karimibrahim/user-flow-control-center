
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Role } from "@/types/user";
import { roles as initialRoles } from "@/data/roles";
import { RolesList } from "@/components/roles/RolesList";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ShieldCheck, PlusCircle } from "lucide-react";

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
    toast.success("Role deleted successfully");
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
          <BreadcrumbPage>Roles</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-purple-600" />
            Role Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage user roles and their permissions
          </p>
        </div>
        <Link to="/roles/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Role
          </Button>
        </Link>
      </div>
      
      <RolesList data={roles} onDelete={handleDeleteRole} />
    </div>
  );
};

export default Roles;
