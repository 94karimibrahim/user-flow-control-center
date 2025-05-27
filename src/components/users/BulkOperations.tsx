
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { User } from "@/types/user";
import { Upload, Download, Users, FileText } from "lucide-react";
import { toast } from "sonner";

interface BulkOperationsProps {
  users: User[];
  onImportUsers: (users: User[]) => void;
}

export function BulkOperations({ users, onImportUsers }: BulkOperationsProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const handleExportUsers = () => {
    const csvHeader = "Name,Email,Role,Status,Department,Joined\n";
    const csvData = users.map(user => 
      `"${user.name}","${user.email}","${user.role}","${user.status}","${user.department || ""}","${user.joined}"`
    ).join("\n");
    
    const blob = new Blob([csvHeader + csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Users exported successfully");
  };

  const handleImportUsers = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error("Please upload a CSV file");
      return;
    }

    setIsImporting(true);
    setImportProgress(0);

    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setImportProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const importedUsers: User[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const userObj: any = {};
        
        headers.forEach((header, index) => {
          userObj[header.toLowerCase()] = values[index] || '';
        });

        if (userObj.name && userObj.email) {
          importedUsers.push({
            id: `imported-${Date.now()}-${i}`,
            name: userObj.name,
            email: userObj.email,
            role: userObj.role || 'user',
            status: userObj.status || 'pending',
            department: userObj.department,
            joined: userObj.joined || new Date().toISOString().split('T')[0],
          } as User);
        }
      }

      clearInterval(progressInterval);
      setImportProgress(100);

      setTimeout(() => {
        onImportUsers(importedUsers);
        setIsImporting(false);
        setImportProgress(0);
        toast.success(`Successfully imported ${importedUsers.length} users`);
      }, 500);

    } catch (error) {
      setIsImporting(false);
      setImportProgress(0);
      toast.error("Failed to import users. Please check the file format.");
    }

    // Reset file input
    event.target.value = '';
  };

  const downloadTemplate = () => {
    const template = "Name,Email,Role,Status,Department\nJohn Doe,john@example.com,user,active,Engineering\nJane Smith,jane@example.com,manager,active,Marketing";
    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user-import-template.csv";
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Template downloaded");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Users
          </CardTitle>
          <CardDescription>
            Bulk import users from a CSV file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isImporting ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="csvFile">Choose CSV File</Label>
                <Input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  onChange={handleImportUsers}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadTemplate}
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>CSV should include: Name, Email, Role, Status, Department</p>
                <p>Supported roles: admin, manager, user, guest</p>
                <p>Supported statuses: active, inactive, pending, suspended</p>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Importing users...</p>
                <Progress value={importProgress} className="w-full" />
              </div>
              <p className="text-xs text-muted-foreground">
                {importProgress}% complete
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Users
          </CardTitle>
          <CardDescription>
            Download all users as a CSV file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{users.length} total users</span>
          </div>
          <Button onClick={handleExportUsers} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export All Users
          </Button>
          <div className="text-xs text-muted-foreground">
            <p>Exports: Name, Email, Role, Status, Department, Join Date</p>
            <p>Compatible with Excel and other spreadsheet applications</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
