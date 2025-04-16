
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          User Flow Control Center
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A comprehensive platform for managing users and their permissions
        </p>
        <Link to="/users">
          <Button size="lg" className="gap-2">
            <Users className="h-5 w-5" />
            Manage Users
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
