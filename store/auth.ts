import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { User } from "@/types/models";
import * as authService from "@/services/auth";
import { getApiErrorMessage, setAuthToken } from "@/services/api";

const TOKEN_KEY = "auth_token";

type AuthState = {
  user: User | null;
  token: string | null;
  isBootstrapping: boolean;
  error: string | null;
  bootstrap: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isBootstrapping: true,
  error: null,
  clearError: () => set({ error: null }),
  bootstrap: async () => {
    set({ isBootstrapping: true });
    const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!storedToken) {
      set({ isBootstrapping: false, token: null, user: null });
      return;
    }
    try {
      setAuthToken(storedToken);
      const user = await authService.me();
      set({ token: storedToken, user, isBootstrapping: false });
    } catch (error) {
      setAuthToken(null);
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      set({ token: null, user: null, isBootstrapping: false, error: getApiErrorMessage(error) });
    }
  },
  login: async (email, password) => {
    set({ error: null });
    try {
      const data = await authService.login(email, password);
      setAuthToken(data.token);
      await SecureStore.setItemAsync(TOKEN_KEY, data.token);
      set({ token: data.token, user: data.user });
    } catch (error) {
      set({ error: getApiErrorMessage(error) });
      throw error;
    }
  },
  register: async (name, email, password) => {
    set({ error: null });
    try {
      const data = await authService.register(name, email, password);
      setAuthToken(data.token);
      await SecureStore.setItemAsync(TOKEN_KEY, data.token);
      set({ token: data.token, user: data.user });
    } catch (error) {
      set({ error: getApiErrorMessage(error) });
      throw error;
    }
  },
  logout: async () => {
    setAuthToken(null);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null, user: null });
  },
}));
