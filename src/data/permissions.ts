
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
      },
      {
        id: "users.export",
        name: "Export Users",
        description: "Export user data to CSV/Excel"
      },
      {
        id: "users.import",
        name: "Import Users",
        description: "Import users from external sources"
      },
      {
        id: "users.audit",
        name: "View User Audit",
        description: "View user activity history"
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
      },
      {
        id: "roles.assign",
        name: "Assign Roles",
        description: "Assign roles to users"
      },
      {
        id: "roles.export",
        name: "Export Roles",
        description: "Export role configurations"
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
      },
      {
        id: "settings.security",
        name: "Security Settings",
        description: "Manage security configurations"
      },
      {
        id: "settings.appearance",
        name: "Appearance Settings",
        description: "Customize system appearance"
      },
      {
        id: "settings.notifications",
        name: "Notification Settings",
        description: "Configure notification preferences"
      },
      {
        id: "settings.backup",
        name: "Backup Settings",
        description: "Configure system backup settings"
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
      },
      {
        id: "profile.password",
        name: "Change Password",
        description: "Change own password"
      },
      {
        id: "profile.mfa",
        name: "Manage MFA",
        description: "Set up or disable multi-factor authentication"
      },
      {
        id: "profile.notifications",
        name: "Manage Notifications",
        description: "Configure personal notification preferences"
      }
    ]
  },
  {
    id: "content",
    name: "Content Management",
    description: "Manage system content and documents",
    permissions: [
      {
        id: "content.view",
        name: "View Content",
        description: "View system content"
      },
      {
        id: "content.create",
        name: "Create Content",
        description: "Create new content"
      },
      {
        id: "content.edit",
        name: "Edit Content",
        description: "Edit existing content"
      },
      {
        id: "content.delete",
        name: "Delete Content",
        description: "Delete content"
      },
      {
        id: "content.publish",
        name: "Publish Content",
        description: "Publish content for public viewing"
      },
      {
        id: "content.categories",
        name: "Manage Categories",
        description: "Create and edit content categories"
      },
      {
        id: "content.comments",
        name: "Manage Comments",
        description: "Moderate content comments"
      }
    ]
  },
  {
    id: "reports",
    name: "Reports",
    description: "Access and generate system reports",
    permissions: [
      {
        id: "reports.view",
        name: "View Reports",
        description: "View system reports"
      },
      {
        id: "reports.create",
        name: "Create Reports",
        description: "Create custom reports"
      },
      {
        id: "reports.export",
        name: "Export Reports",
        description: "Export reports to various formats"
      },
      {
        id: "reports.schedule",
        name: "Schedule Reports",
        description: "Schedule automated report generation"
      },
      {
        id: "reports.share",
        name: "Share Reports",
        description: "Share reports with other users"
      },
      {
        id: "reports.analytics",
        name: "Analytics Dashboard",
        description: "Access analytics dashboard"
      }
    ]
  },
  {
    id: "api",
    name: "API Access",
    description: "Manage API integrations and access",
    permissions: [
      {
        id: "api.view",
        name: "View API Keys",
        description: "View API keys and usage"
      },
      {
        id: "api.create",
        name: "Create API Keys",
        description: "Generate new API keys"
      },
      {
        id: "api.revoke",
        name: "Revoke API Keys",
        description: "Revoke existing API keys"
      },
      {
        id: "api.limits",
        name: "Set API Limits",
        description: "Configure API usage limits"
      },
      {
        id: "api.logs",
        name: "View API Logs",
        description: "Access API usage logs"
      }
    ]
  },
  {
    id: "notifications",
    name: "Notifications",
    description: "Manage system notifications",
    permissions: [
      {
        id: "notifications.view",
        name: "View Notifications",
        description: "View system notifications"
      },
      {
        id: "notifications.send",
        name: "Send Notifications",
        description: "Send notifications to users"
      },
      {
        id: "notifications.templates",
        name: "Manage Templates",
        description: "Create and edit notification templates"
      },
      {
        id: "notifications.settings",
        name: "Configure Notifications",
        description: "Configure notification channels and settings"
      }
    ]
  },
  {
    id: "audit",
    name: "Audit Logs",
    description: "Access system audit logs",
    permissions: [
      {
        id: "audit.view",
        name: "View Audit Logs",
        description: "View system audit logs"
      },
      {
        id: "audit.export",
        name: "Export Audit Logs",
        description: "Export audit logs"
      },
      {
        id: "audit.settings",
        name: "Audit Settings",
        description: "Configure audit logging settings"
      },
      {
        id: "audit.alerts",
        name: "Audit Alerts",
        description: "Configure audit-based security alerts"
      }
    ]
  },
  {
    id: "integrations",
    name: "Integrations",
    description: "Manage external integrations",
    permissions: [
      {
        id: "integrations.view",
        name: "View Integrations",
        description: "View available integrations"
      },
      {
        id: "integrations.create",
        name: "Add Integrations",
        description: "Add new integrations"
      },
      {
        id: "integrations.edit",
        name: "Edit Integrations",
        description: "Edit integration configurations"
      },
      {
        id: "integrations.delete",
        name: "Remove Integrations",
        description: "Remove existing integrations"
      },
      {
        id: "integrations.test",
        name: "Test Integrations",
        description: "Test integration connections"
      }
    ]
  },
  {
    id: "billing",
    name: "Billing & Payments",
    description: "Manage billing and payment information",
    permissions: [
      {
        id: "billing.view",
        name: "View Billing",
        description: "View billing information"
      },
      {
        id: "billing.manage",
        name: "Manage Billing",
        description: "Update billing details"
      },
      {
        id: "billing.invoices",
        name: "Access Invoices",
        description: "View and download invoices"
      },
      {
        id: "billing.payments",
        name: "Process Payments",
        description: "Process manual payments"
      },
      {
        id: "billing.plans",
        name: "Manage Plans",
        description: "Change subscription plans"
      }
    ]
  }
];
