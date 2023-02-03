import api from "@/services/api";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";

interface AuthContextData {
  user: UserProps | null;
  isAuthenticated: boolean;
  signIn(email: string, password: string): Promise<void>;
  signUp(name: string, email: string, password: string): Promise<void>;
  logoutUser(): Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
  subscriptions?: SubscriptionProps | null;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(null, "@auth.token", { path: "/" });
    Router.push("/login");
  } catch (err) {
    console.log(err);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!user;

  async function signIn(email: string, password: string) {
    const response = await api.post("/session", { email, password });
    const { id, name, token, subscriptions, address } = response.data;
    setCookie(undefined, "@auth.token", token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    setUser({ id, name, email, address, subscriptions });
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    Router.push("/dashboard");
  }

  async function signUp(name: string, email: string, password: string) {
    await api.post("/users", { name, email, password });
    Router.push("/login");
  }

  async function logoutUser() {
    signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
