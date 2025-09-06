import { createContext, useContext, useState } from "react";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [token, setToken] =   useState<string | null>(() => localStorage.getItem('authToken'));

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
    }

    const isAuthenticated = !!token;

    return (
       
    );

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
