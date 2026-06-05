"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { signInUser } from "../services/auth-service";
import api from "../services/api";

type AuthContextType = {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// 1. Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    const data = await signInUser(email, password);
    setUser(data.user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  //   async function getUserInfo() {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const data = await api.get("/auth/profile");
  //       setUser(data.data);
  //       setLoading(false);
  //     } else {
  //       setUser(null);
  //       setLoading(false);
  //     }
  //   }

  //   useEffect(() => {
  //     getUserInfo();
  //   }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? <p className="text-center">Loading...</p> : children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
