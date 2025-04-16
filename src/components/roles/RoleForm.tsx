
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Role, UserRole } from "@/types/user";
import { permissionGroups } from "@/data/permissions";
import { PermissionGroup } from "@/components/roles/PermissionGroup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.enum(["admin", "manager", "user", "guest"], {
    required_error: "Please select a role type",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters",
  }),
});

type FormData = z.infer<typeof formSchema>;

export type RoleFormProps = {
  onSubmit: (role: Role) => void;
  initialData?: Partial<Role>;
  isEditing?: boolean;
};

export function RoleForm({ onSubmit, initialData, isEditing = false }: RoleFormProps) {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<string[]>(initialData?.permissions || []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: (initialData?.name as UserRole) || undefined,
      description: initialData?.description || "",
    },
  });

  const handleSubmit = (values: FormData) => {
    const now = new Date().toISOString().split('T')[0];
    
    const role: Role = {
      id: initialData?.id || uuidv4(),
      name: values.name as UserRole,
      description: values.description,
      permissions: permissions,
      usersCount: initialData?.usersCount || 0,
      createdAt: initialData?.createdAt || now,
      updatedAt: now,
    };
    
    onSubmit(role);
  };

  const handlePermissionChange = (permissionId: string, isChecked: boolean) => {
    setPermissions(prevPermissions => {
      if (isChecked && !prevPermissions.includes(permissionId)) {
        return [...prevPermissions, permissionId];
      } else if (!isChecked && prevPermissions.includes(permissionId)) {
        return prevPermissions.filter(id => id !== permissionId);
      }
      return prevPermissions;
    });
  };

  const handleRoleTemplateChange = (role: UserRole) => {
    // Set default permissions based on role template
    let defaultPermissions: string[] = [];
    
    switch(role) {
      case 'admin':
        defaultPermissions = permissionGroups.flatMap(group => 
          group.permissions.map(permission => permission.id)
        );
        break;
      case 'manager':
        defaultPermissions = [
          'users.view', 'users.create', 'users.edit',
          'roles.view', 'settings.view'
        ];
        break;
      case 'user':
        defaultPermissions = ['profile.view', 'profile.edit'];
        break;
      case 'guest':
        defaultPermissions = ['profile.view'];
        break;
    }
    
    setPermissions(defaultPermissions);
    form.setValue('name', role);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-5 w-5 text-purple-600" />
          <CardTitle>{isEditing ? "Edit Role" : "Create New Role"}</CardTitle>
        </div>
        <CardDescription>
          {isEditing 
            ? "Update the role details and permissions" 
            : "Define a new role with specific permissions"}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Template</FormLabel>
                  <Select 
                    onValueChange={(value) => handleRoleTemplateChange(value as UserRole)} 
                    defaultValue={field.value}
                    disabled={isEditing}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The role template determines the default permissions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the purpose of this role"
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a clear description of what this role is used for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="flex items-center gap-2 mb-4 mt-6">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Permissions</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Select the permissions for this role. Permissions determine what actions users with this role can perform.
              </p>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                {permissionGroups.map((group) => (
                  <PermissionGroup
                    key={group.id}
                    group={group}
                    selectedPermissions={permissions}
                    onPermissionChange={handlePermissionChange}
                  />
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/roles")}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Role" : "Create Role"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
