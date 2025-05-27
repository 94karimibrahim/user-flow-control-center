
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Team } from "@/types/user";
import { users } from "@/data/users";
import { roles } from "@/data/roles";

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTeam: (team: Omit<Team, "id" | "createdAt" | "updatedAt">) => void;
}

export function CreateTeamDialog({ open, onOpenChange, onCreateTeam }: CreateTeamDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onCreateTeam({
      name,
      description,
      members: selectedMembers,
      roles: selectedRoles,
    });

    // Reset form
    setName("");
    setDescription("");
    setSelectedMembers([]);
    setSelectedRoles([]);
    onOpenChange(false);
  };

  const toggleMember = (userId: string) => {
    setSelectedMembers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleRole = (roleName: string) => {
    setSelectedRoles(prev =>
      prev.includes(roleName)
        ? prev.filter(name => name !== roleName)
        : [...prev, roleName]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Create a team to organize users and manage group permissions
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter team name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the team's purpose"
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Team Members</Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`member-${user.id}`}
                    checked={selectedMembers.includes(user.id)}
                    onCheckedChange={() => toggleMember(user.id)}
                  />
                  <Label htmlFor={`member-${user.id}`} className="text-sm">
                    {user.name} ({user.email})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Team Roles</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role.id}`}
                    checked={selectedRoles.includes(role.name)}
                    onCheckedChange={() => toggleRole(role.name)}
                  />
                  <Label htmlFor={`role-${role.id}`} className="text-sm capitalize">
                    {role.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Create Team
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
