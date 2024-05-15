import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserInterface } from "@/interfaces/user";

const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, user } = useAuth();
  if (token && (user as UserInterface)?._id) return <Navigate to="/" replace />;
  return children;
};

export default PublicRoute;
