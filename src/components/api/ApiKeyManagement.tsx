
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ApiKey } from "@/types/user";
import { Key, Plus, Copy, Eye, EyeOff, Trash2, Search } from "lucide-react";
import { CreateApiKeyDialog } from "./CreateApiKeyDialog";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface ApiKeyManagementProps {
  apiKeys: ApiKey[];
  onCreateApiKey: (apiKey: Omit<ApiKey, "id" | "key" | "createdAt">) => void;
  onDeleteApiKey: (keyId: string) => void;
  onToggleApiKey: (keyId: string) => void;
}

export function ApiKeyManagement({ 
  apiKeys, 
  onCreateApiKey, 
  onDeleteApiKey, 
  onToggleApiKey 
}: ApiKeyManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const filteredKeys = apiKeys.filter(key =>
    key.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("API key copied to clipboard");
  };

  const maskKey = (key: string) => {
    return key.slice(0, 8) + "..." + key.slice(-4);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Key className="h-6 w-6" />
            API Key Management
          </h2>
          <p className="text-muted-foreground">Create and manage API keys for system access</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search API keys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredKeys.map((apiKey) => (
          <Card key={apiKey.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {apiKey.name}
                    <Badge variant={apiKey.isActive ? "default" : "secondary"}>
                      {apiKey.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Created {formatDistanceToNow(new Date(apiKey.createdAt), { addSuffix: true })}
                    {apiKey.lastUsed && (
                      <> • Last used {formatDistanceToNow(new Date(apiKey.lastUsed), { addSuffix: true })}</>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleApiKey(apiKey.id)}
                  >
                    {apiKey.isActive ? "Disable" : "Enable"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteApiKey(apiKey.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">API Key</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 p-2 rounded text-sm font-mono">
                    {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                  >
                    {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(apiKey.key)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Scopes</p>
                  <div className="flex flex-wrap gap-1">
                    {apiKey.scopes.map((scope) => (
                      <Badge key={scope} variant="outline" className="text-xs">
                        {scope}
                      </Badge>
                    ))}
                  </div>
                </div>

                {apiKey.expiresAt && (
                  <div>
                    <p className="text-sm font-medium mb-2">Expires</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(apiKey.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {apiKey.rateLimit && (
                  <div>
                    <p className="text-sm font-medium mb-2">Rate Limit</p>
                    <p className="text-sm text-muted-foreground">
                      {apiKey.rateLimit} requests/hour
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredKeys.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No API keys found</p>
          </CardContent>
        </Card>
      )}

      <CreateApiKeyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateApiKey={onCreateApiKey}
      />
    </div>
  );
}
