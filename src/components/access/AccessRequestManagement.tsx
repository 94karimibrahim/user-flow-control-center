
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AccessRequest } from "@/types/user";
import { users } from "@/data/users";
import { CheckCircle, XCircle, Clock, Search, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface AccessRequestManagementProps {
  accessRequests: AccessRequest[];
  onApproveRequest: (requestId: string, comment?: string) => void;
  onRejectRequest: (requestId: string, comment: string) => void;
}

export function AccessRequestManagement({ 
  accessRequests, 
  onApproveRequest, 
  onRejectRequest 
}: AccessRequestManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [reviewComments, setReviewComments] = useState<Record<string, string>>({});

  const filteredRequests = accessRequests.filter(request => {
    const user = users.find(u => u.id === request.userId);
    const matchesSearch = user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || request.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || "Unknown User";
  };

  const handleApprove = (requestId: string) => {
    onApproveRequest(requestId, reviewComments[requestId]);
    setReviewComments(prev => ({ ...prev, [requestId]: "" }));
    toast.success("Access request approved");
  };

  const handleReject = (requestId: string) => {
    const comment = reviewComments[requestId];
    if (!comment?.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    onRejectRequest(requestId, comment);
    setReviewComments(prev => ({ ...prev, [requestId]: "" }));
    toast.success("Access request rejected");
  };

  const getStatusBadge = (status: AccessRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Access Requests</h2>
        <p className="text-muted-foreground">Review and manage user access requests</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status as any)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {getUserName(request.userId)}
                    {getStatusBadge(request.status)}
                  </CardTitle>
                  <CardDescription>
                    Requested {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                    {request.reviewedAt && (
                      <> • Reviewed {formatDistanceToNow(new Date(request.reviewedAt), { addSuffix: true })}</>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Reason</p>
                <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                  {request.reason}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {request.requestedPermissions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Requested Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {request.requestedPermissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {request.requestedRoles.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Requested Roles</p>
                    <div className="flex flex-wrap gap-1">
                      {request.requestedRoles.map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {request.comments && (
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Review Comments
                  </p>
                  <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                    {request.comments}
                  </p>
                  {request.reviewedBy && (
                    <p className="text-xs text-muted-foreground mt-1">
                      By {getUserName(request.reviewedBy)}
                    </p>
                  )}
                </div>
              )}

              {request.status === "pending" && (
                <div className="space-y-3 border-t pt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Review Comment</label>
                    <Textarea
                      placeholder="Add a comment (required for rejection)"
                      value={reviewComments[request.id] || ""}
                      onChange={(e) => setReviewComments(prev => ({ 
                        ...prev, 
                        [request.id]: e.target.value 
                      }))}
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(request.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No access requests found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
