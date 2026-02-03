import axios, { AxiosError } from "axios";
import Constants from "expo-constants";

const baseURL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  Constants.expoConfig?.extra?.apiBaseUrl ||
  "http://localhost:3000/api";

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export type ApiErrorPayload = {
  error?: {
    message?: string;
    code?: string;
    details?: Record<string, unknown>;
  };
  message?: string;
};

export const getApiErrorMessage = (error: unknown) => {
  const fallback = "Something went wrong. Please try again.";
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorPayload>;
    return (
      axiosError.response?.data?.error?.message ||
      axiosError.response?.data?.message ||
      axiosError.message ||
      fallback
    );
  }
  if (error instanceof Error) return error.message;
  return fallback;
};

export const getApiErrorCode = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorPayload>;
    return axiosError.response?.data?.error?.code;
  }
  return undefined;
};
