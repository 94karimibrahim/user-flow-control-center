
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { userSessions } from "@/data/activity";
import { users } from "@/data/users";
import { formatDistanceToNow } from "date-fns";

export function ActiveUsersList() {
  const activeSessions = userSessions.filter(session => session.isActive);

  const getUser = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
        <CardDescription>
          Users currently online ({activeSessions.length})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeSessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No users currently active
            </p>
          ) : (
            activeSessions.map((session) => {
              const user = getUser(session.userId);
              if (!user) return null;

              return (
                <div key={session.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Online
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Active {formatDistanceToNow(new Date(session.lastActivity), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
