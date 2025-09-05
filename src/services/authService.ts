
import axios from "axios";

const API_URL = "https://localhost:7183/api/user";

export const login = async (email: string, password: string) => 
    {
        const response = await axios.post(`${API_URL}/login`, { email, password });
      
        console.log("Login response:", response.data);
        if (response.data.success === true) {
            return response.data.data;
        } else {
            throw new Error(response.data.ErrorMessage || "Login failed");
  }
};

export const getProfile = async () => {
    const response = await axios.get("/auth/profile");
    return response.data;
}