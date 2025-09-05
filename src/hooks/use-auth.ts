import { useState, useEffect } from "react";
import { verifyToken } from "@/services/authService";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await verifyToken();
      setIsAuthenticated(isValid);
    };
    
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    window.location.href = "/admin/login";
  };

  return {
    isAuthenticated,
    logout
  };
}