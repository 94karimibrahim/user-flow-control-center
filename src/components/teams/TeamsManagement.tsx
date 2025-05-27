
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Team } from "@/types/user";
import { users } from "@/data/users";
import { Plus, Users, Search, Edit, Trash2 } from "lucide-react";
import { CreateTeamDialog } from "./CreateTeamDialog";

interface TeamsManagementProps {
  teams: Team[];
  onCreateTeam: (team: Omit<Team, "id" | "createdAt" | "updatedAt">) => void;
  onDeleteTeam: (teamId: string) => void;
}

export function TeamsManagement({ teams, onCreateTeam, onDeleteTeam }: TeamsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || "Unknown User";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Teams Management</h2>
          <p className="text-muted-foreground">Organize users into teams and manage group permissions</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{team.name}</CardTitle>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                  onClick={() => onDeleteTeam(team.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{team.description}</CardDescription>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Members ({team.members.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {team.members.slice(0, 3).map((memberId) => (
                      <Badge key={memberId} variant="outline" className="text-xs">
                        {getUserName(memberId)}
                      </Badge>
                    ))}
                    {team.members.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{team.members.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Roles ({team.roles.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {team.roles.map((role) => (
                      <Badge key={role} variant="secondary" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Created {new Date(team.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No teams found</p>
          </CardContent>
        </Card>
      )}

      <CreateTeamDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateTeam={onCreateTeam}
      />
    </div>
  );
}
