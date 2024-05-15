import { UserInterface } from "@/interfaces/user";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<{
  user: UserInterface | "Public";
  token: string | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: "Public",
  token: null,
  login: async () => {},
  logout: async () => {},
});

const useAuth = () => useContext(AuthContext);
