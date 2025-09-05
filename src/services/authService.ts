// authService.ts
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_VITE_API_URL || "http://localhost:5225/api";

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${VITE_API_URL}/user/login`, { email, password });
  
  if (response.data.success === true && response.data.data) {
    return response.data.data; // Return the JWT token
  } else {
    throw new Error(response.data.errorMessage || "Login failed");
  }
};

// Simplified JWT verification - only checks format and expiration
export const verifyJwtToken = (token: string): boolean => {
  try {
    // Check if it's a valid JWT format
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log("Invalid JWT format");
      return false;
    }
    
    // Decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]));
    
    // Check expiration (only if exp claim exists)
    if (payload.exp) {
      const currentTime = Date.now() / 1000;
      if (payload.exp < currentTime) {
        console.log("Token expired");
        return false;
      }
    }
    
    // If we reach here, the token is valid
    return true;
    
  } catch (error) {
    console.error("JWT verification failed:", error);
    return false;
  }
};

// Simple token verification without specific claim checks
export const verifyToken = async (): Promise<boolean> => {
  const token = localStorage.getItem("authToken");
  return !!token && verifyJwtToken(token);
};

// Optional: Get user info from token if needed
export const getUserFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    return payload; // Return the entire payload
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};