
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Role } from "@/types/user";
import { PenLine, Trash2, ChevronRight, Users, Calendar, ShieldAlert } from "lucide-react";
import { DeleteRoleDialog } from "./DeleteRoleDialog";

interface RolesListProps {
  data: Role[];
  onDelete: (roleId: string) => void;
}

export function RolesList({ data, onDelete }: RolesListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (roleToDelete) {
      onDelete(roleToDelete.id);
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((role) => (
        <Card key={role.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge className={`${getRoleColorClass(role.name)} capitalize text-xs px-2 py-1`}>
                  {role.name}
                </Badge>
                <div className="flex gap-2">
                  <Link to={`/roles/${role.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <PenLine className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteClick(role)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              <h3 className="text-lg font-semibold capitalize mb-1">{role.name} Role</h3>
              <p className="text-muted-foreground text-sm mb-3">{role.description}</p>
              
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">Permissions:</span>
                  <span>{role.permissions.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">Users:</span>
                  <span>{role.usersCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">Last updated:</span>
                  <span>{new Date(role.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100">
              <Link to={`/roles/${role.id}`} className="block">
                <Button variant="ghost" className="w-full rounded-none justify-between h-12">
                  View details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {data.length === 0 && (
        <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-muted-foreground">No roles found</p>
        </div>
      )}
      
      {roleToDelete && (
        <DeleteRoleDialog
          role={roleToDelete}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
