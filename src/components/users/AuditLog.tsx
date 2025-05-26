
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { auditLogs } from "@/data/activity";
import { AuditLog as AuditLogType } from "@/types/activity";
import { formatDistanceToNow, format } from "date-fns";
import { FileText, Filter } from "lucide-react";

export function AuditLog() {
  const [filter, setFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");

  const filteredLogs = auditLogs.filter(log => {
    if (filter !== "all" && log.entityType !== filter) return false;
    if (actionFilter !== "all" && log.action !== actionFilter) return false;
    return true;
  });

  const getActionBadgeColor = (action: AuditLogType["action"]) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "delete":
        return "bg-red-100 text-red-800";
      case "assign":
      case "revoke":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEntityBadgeColor = (entityType: AuditLogType["entityType"]) => {
    switch (entityType) {
      case "user":
        return "bg-blue-100 text-blue-800";
      case "role":
        return "bg-purple-100 text-purple-800";
      case "permission":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Audit Log
            </CardTitle>
            <CardDescription>
              Track all changes made to users and roles
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="role">Roles</SelectItem>
                <SelectItem value="permission">Permissions</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="assign">Assign</SelectItem>
                <SelectItem value="revoke">Revoke</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredLogs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No audit logs found for the selected filters
            </p>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={getEntityBadgeColor(log.entityType)}>
                        {log.entityType}
                      </Badge>
                      <Badge className={getActionBadgeColor(log.action)}>
                        {log.action}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{log.description}</p>
                    <p className="text-xs text-muted-foreground">
                      By {log.performedByName}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{format(new Date(log.timestamp), "MMM dd, yyyy")}</p>
                    <p>{format(new Date(log.timestamp), "HH:mm:ss")}</p>
                  </div>
                </div>
                {(log.oldValues || log.newValues) && (
                  <div className="text-xs space-y-1 bg-gray-50 p-2 rounded">
                    {log.oldValues && (
                      <p>
                        <span className="font-medium">Old:</span>{" "}
                        {JSON.stringify(log.oldValues)}
                      </p>
                    )}
                    {log.newValues && (
                      <p>
                        <span className="font-medium">New:</span>{" "}
                        {JSON.stringify(log.newValues)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
