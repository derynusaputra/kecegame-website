"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { apiBase } from "@/services/apiBase";
import { getCookie } from "@/helpers/getCookie";
import { isAxiosError } from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const token = getCookie("token");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await apiBase(token).get("/v1/users/me");

      if (res.status === 200) {
        setUser(res.data?.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 401) {
          logout();
        }
      }

      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = (token) => {
    document.cookie = `token=${token}; path=/; SameSite=Lax;`;
    router.push("/admin");
  };
  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
