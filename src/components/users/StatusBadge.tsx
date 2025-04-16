
import { cn } from "@/lib/utils";
import { UserStatus } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: UserStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "active":
        return {
          label: "Active",
          variant: "success" as const,
          icon: CheckCircle
        };
      case "inactive":
        return {
          label: "Inactive",
          variant: "destructive" as const,
          icon: XCircle
        };
      case "pending":
        return {
          label: "Pending",
          variant: "warning" as const,
          icon: Clock
        };
      default:
        return {
          label: status,
          variant: "default" as const,
          icon: null
        };
    }
  };

  const { label, variant, icon: Icon } = getStatusConfig();

  return (
    <Badge 
      className={cn(
        "gap-1 font-medium",
        variant === "success" && "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800",
        variant === "destructive" && "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800",
        variant === "warning" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800",
        className
      )}
    >
      {Icon && <Icon size={14} className="shrink-0" />}
      {label}
    </Badge>
  );
}
