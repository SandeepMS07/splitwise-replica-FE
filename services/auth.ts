import { api } from "./api";
import { User } from "@/types/models";

export type AuthResponse = {
  token: string;
  user: User;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return data;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const { data } = await api.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
  });
  return data;
};

export const me = async () => {
  const { data } = await api.get<{ user: User }>("/auth/me");
  return data.user;
};
