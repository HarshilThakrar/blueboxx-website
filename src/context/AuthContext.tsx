import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/axios";

export type UserRole = "student" | "expert" | "company" | "admin" | "super_admin" | "college" | "intern" | "job-seeker" | null;

interface User {
  name: string;
  email: string;
  avatar?: string;
  role?: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  role: UserRole;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // 1. Load initial user from localStorage if available
    const storedUser = localStorage.getItem("blueboxx_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Ignore invalid stored data
      }
    }

    // 2. Fetch fresh user data from backend `/me` if token is present
    const token = localStorage.getItem("auth_token");
    if (token) {
      api.get("/me")
        .then((response) => {
          const fetchedUser = response.data;
          // Map backend roles array/data to User interface
          let role = null;
          if (fetchedUser.roles && fetchedUser.roles.length > 0) {
            const roleNames = fetchedUser.roles.map((r: any) => r.name);
            if (roleNames.includes('super_admin')) role = 'super_admin';
            else if (roleNames.includes('admin')) role = 'admin';
            else role = roleNames[0];
          }

          const mappedUser = {
            name: fetchedUser.name,
            email: fetchedUser.email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fetchedUser.name)}`,
            role: role
          };
          setUser(mappedUser);
          localStorage.setItem("blueboxx_user", JSON.stringify(mappedUser));
        })
        .catch(() => {
          // Token is invalid/expired — clear everything silently
          localStorage.removeItem("auth_token");
          localStorage.removeItem("blueboxx_user");
          setUser(null);
        })
        .finally(() => {
          setIsAuthReady(true);
        });
    } else {
      // No token — auth is immediately ready (user is not logged in)
      setIsAuthReady(true);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("blueboxx_user", JSON.stringify(userData));
  };

  const logout = () => {
    // Call backend to invalidate the token (fire and forget)
    const token = localStorage.getItem("auth_token");
    if (token) {
      api.post("/logout").catch(() => {});
    }
    // Clear all auth data from localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("blueboxx_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAuthReady,
      role: user?.role ?? null,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
