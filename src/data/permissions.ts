
// Define permission categories and their specific permissions
export type Permission = {
  id: string;
  name: string;
  description: string;
};

export type PermissionGroup = {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
};

export const permissionGroups: PermissionGroup[] = [
  {
    id: "users",
    name: "User Management",
    description: "Manage system users and their profiles",
    permissions: [
      { 
        id: "users.view", 
        name: "View Users", 
        description: "View users and their profiles" 
      },
      { 
        id: "users.create", 
        name: "Create Users", 
        description: "Create new user accounts" 
      },
      { 
        id: "users.edit", 
        name: "Edit Users", 
        description: "Edit existing user accounts" 
      },
      { 
        id: "users.delete", 
        name: "Delete Users", 
        description: "Remove user accounts" 
      }
    ]
  },
  {
    id: "roles",
    name: "Role Management",
    description: "Manage system roles and their permissions",
    permissions: [
      { 
        id: "roles.view", 
        name: "View Roles", 
        description: "View roles and their permissions" 
      },
      { 
        id: "roles.create", 
        name: "Create Roles", 
        description: "Create new roles" 
      },
      { 
        id: "roles.edit", 
        name: "Edit Roles", 
        description: "Edit existing roles" 
      },
      { 
        id: "roles.delete", 
        name: "Delete Roles", 
        description: "Remove roles" 
      }
    ]
  },
  {
    id: "settings",
    name: "Settings",
    description: "Manage system settings",
    permissions: [
      { 
        id: "settings.view", 
        name: "View Settings", 
        description: "View system settings" 
      },
      { 
        id: "settings.edit", 
        name: "Edit Settings", 
        description: "Edit system settings" 
      }
    ]
  },
  {
    id: "profile",
    name: "Profile",
    description: "User profile management",
    permissions: [
      { 
        id: "profile.view", 
        name: "View Profile", 
        description: "View own profile" 
      },
      { 
        id: "profile.edit", 
        name: "Edit Profile", 
        description: "Edit own profile" 
      }
    ]
  }
];
