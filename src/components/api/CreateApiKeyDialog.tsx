
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiKey } from "@/types/user";
import { permissionGroups } from "@/data/permissions";

interface CreateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateApiKey: (apiKey: Omit<ApiKey, "id" | "key" | "createdAt">) => void;
}

export function CreateApiKeyDialog({ open, onOpenChange, onCreateApiKey }: CreateApiKeyDialogProps) {
  const [name, setName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [expiresIn, setExpiresIn] = useState<string>("never");
  const [rateLimit, setRateLimit] = useState<number>(1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let expiresAt: string | undefined;
    if (expiresIn !== "never") {
      const days = parseInt(expiresIn);
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + days);
      expiresAt = expiry.toISOString();
    }

    onCreateApiKey({
      name,
      userId: "current-user", // This would be the current user's ID
      scopes: selectedScopes,
      expiresAt,
      rateLimit,
      isActive: true,
    });

    // Reset form
    setName("");
    setSelectedScopes([]);
    setExpiresIn("never");
    setRateLimit(1000);
    onOpenChange(false);
  };

  const toggleScope = (scope: string) => {
    setSelectedScopes(prev =>
      prev.includes(scope)
        ? prev.filter(s => s !== scope)
        : [...prev, scope]
    );
  };

  const allPermissions = permissionGroups.flatMap(group => 
    group.permissions.map(permission => permission.id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Generate a new API key with specific permissions and restrictions
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Key Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a descriptive name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expires">Expires In</Label>
              <Select value={expiresIn} onValueChange={setExpiresIn}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
              <Input
                id="rateLimit"
                type="number"
                value={rateLimit}
                onChange={(e) => setRateLimit(parseInt(e.target.value))}
                min="1"
                max="10000"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Permissions (Scopes)</Label>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {allPermissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={`scope-${permission}`}
                    checked={selectedScopes.includes(permission)}
                    onCheckedChange={() => toggleScope(permission)}
                  />
                  <Label htmlFor={`scope-${permission}`} className="text-sm">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedScopes(allPermissions)}
              >
                Select All
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedScopes([])}
              >
                Clear All
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || selectedScopes.length === 0}>
              Create API Key
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
