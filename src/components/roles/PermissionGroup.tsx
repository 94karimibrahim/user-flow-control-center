
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PermissionGroup as PermissionGroupType, Permission } from "@/data/permissions";
import { Lock } from "lucide-react";

interface PermissionGroupProps {
  group: PermissionGroupType;
  selectedPermissions: string[];
  onPermissionChange: (permissionId: string, isChecked: boolean) => void;
}

export function PermissionGroup({ 
  group, 
  selectedPermissions, 
  onPermissionChange 
}: PermissionGroupProps) {
  const [groupChecked, setGroupChecked] = useState<boolean | "indeterminate">(false);
  
  // Update the group's checked state when selected permissions change
  useEffect(() => {
    const groupPermissionIds = group.permissions.map(p => p.id);
    const selectedGroupPermissions = groupPermissionIds.filter(id => 
      selectedPermissions.includes(id)
    );
    
    if (selectedGroupPermissions.length === 0) {
      setGroupChecked(false);
    } else if (selectedGroupPermissions.length === groupPermissionIds.length) {
      setGroupChecked(true);
    } else {
      setGroupChecked("indeterminate");
    }
  }, [selectedPermissions, group.permissions]);

  // Handle checking/unchecking the entire group
  const handleGroupChange = (checked: boolean) => {
    group.permissions.forEach(permission => {
      onPermissionChange(permission.id, checked);
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="py-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`group-${group.id}`}
            checked={groupChecked === true}
            className="data-[state=indeterminate]:bg-primary data-[state=indeterminate]:opacity-80"
            onClick={() => handleGroupChange(groupChecked !== true)}
            {...(groupChecked === "indeterminate" && { "data-state": "indeterminate" })}
          />
          <div className="flex items-center">
            <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
            <CardTitle className="text-md">{group.name}</CardTitle>
          </div>
        </div>
        <CardDescription>{group.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {group.permissions.map((permission) => (
            <div key={permission.id} className="flex items-start space-x-2">
              <Checkbox 
                id={permission.id}
                checked={selectedPermissions.includes(permission.id)}
                onCheckedChange={(checked) => {
                  onPermissionChange(permission.id, checked === true);
                }}
              />
              <div className="grid gap-1">
                <label
                  htmlFor={permission.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {permission.name}
                </label>
                <p className="text-xs text-muted-foreground">
                  {permission.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
