// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { verifyToken } from "@/services/authService";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await verifyToken();
        setIsAuthenticated(isValid);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();

    // Listen for storage events (login/logout from other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    // Redirect to login page immediately
    navigate("/admin/login");
    // Trigger storage event to sync across tabs
    window.dispatchEvent(new Event('storage'));
  };

  const login = () => {
    setIsAuthenticated(true);
    // Trigger storage event to sync across tabs
    window.dispatchEvent(new Event('storage'));
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
    login
  };
}