// components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyJwtToken, verifyToken } from "@/services/authService";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Use the improved JWT verification
        const isValid = await verifyToken();
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}