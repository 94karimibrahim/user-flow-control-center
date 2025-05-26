
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userStats, systemStats } from "@/data/activity";
import { users } from "@/data/users";
import { TrendingUp } from "lucide-react";

export function UserStatistics() {
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
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Most Active Users
        </CardTitle>
        <CardDescription>
          Top users by login count
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemStats.mostActiveUsers.map((activeUser, index) => {
            const user = getUser(activeUser.userId);
            const stats = userStats.find(s => s.userId === activeUser.userId);
            
            if (!user || !stats) return null;

            return (
              <div key={activeUser.userId} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Avg: {stats.averageSessionTime}m per session
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{activeUser.loginCount}</p>
                  <p className="text-xs text-muted-foreground">logins</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
