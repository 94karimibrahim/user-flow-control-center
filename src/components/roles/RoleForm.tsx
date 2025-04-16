
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Role, UserRole } from "@/types/user";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck } from "lucide-react";

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
                  <FormLabel>Role Name</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
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
                    The type of role determines the default permissions.
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

            {/* Permissions section will be added later */}
            <div className="border rounded-md p-4 bg-gray-50">
              <p className="text-sm font-medium mb-2">Permissions</p>
              <p className="text-sm text-muted-foreground">
                Permission management will be implemented in a future update.
              </p>
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
