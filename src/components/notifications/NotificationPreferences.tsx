
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NotificationPreferences as NotificationPrefsType } from "@/types/notification";
import { defaultNotificationPreferences } from "@/data/notifications";
import { toast } from "sonner";

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPrefsType>(
    defaultNotificationPreferences
  );

  const handleToggle = (key: keyof NotificationPrefsType | string, value: boolean) => {
    if (key === "emailNotifications" || key === "pushNotifications") {
      setPreferences(prev => ({
        ...prev,
        [key]: value
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        categories: {
          ...prev.categories,
          [key]: value
        }
      }));
    }
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving notification preferences:", preferences);
    toast.success("Notification preferences saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Configure how you want to receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Delivery Methods</h4>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-sm">
              Email notifications
            </Label>
            <Switch
              id="email-notifications"
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => handleToggle("emailNotifications", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="text-sm">
              Push notifications
            </Label>
            <Switch
              id="push-notifications"
              checked={preferences.pushNotifications}
              onCheckedChange={(checked) => handleToggle("pushNotifications", checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Categories</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="user-notifications" className="text-sm">
                User Management
              </Label>
              <p className="text-xs text-muted-foreground">
                User creation, updates, and deletions
              </p>
            </div>
            <Switch
              id="user-notifications"
              checked={preferences.categories.user}
              onCheckedChange={(checked) => handleToggle("user", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="role-notifications" className="text-sm">
                Role Management
              </Label>
              <p className="text-xs text-muted-foreground">
                Role and permission changes
              </p>
            </div>
            <Switch
              id="role-notifications"
              checked={preferences.categories.role}
              onCheckedChange={(checked) => handleToggle("role", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="system-notifications" className="text-sm">
                System Updates
              </Label>
              <p className="text-xs text-muted-foreground">
                Maintenance and system announcements
              </p>
            </div>
            <Switch
              id="system-notifications"
              checked={preferences.categories.system}
              onCheckedChange={(checked) => handleToggle("system", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="security-notifications" className="text-sm">
                Security Alerts
              </Label>
              <p className="text-xs text-muted-foreground">
                Login attempts and security events
              </p>
            </div>
            <Switch
              id="security-notifications"
              checked={preferences.categories.security}
              onCheckedChange={(checked) => handleToggle("security", checked)}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}
