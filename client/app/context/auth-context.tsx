"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface TokenType {
  accessToken: string;
  expiresIn: string;
  role: string;
}

interface AuthContextType {
  token: TokenType | null;
  setToken: (token: TokenType | null) => void;
  getAccessToken: () => string | null;
  getRole: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<TokenType | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        setTokenState(parsedToken);
      } catch (error) {
        console.error("Failed to parse stored token:", error);
      }
    }
  }, []);

  const setToken = (token: TokenType | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };

  const getAccessToken = () => token?.accessToken || null;
  const getRole = () => token?.role || null;

  return (
    <AuthContext.Provider value={{ token, setToken, getAccessToken, getRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
