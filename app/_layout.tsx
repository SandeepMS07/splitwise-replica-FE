import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/auth";
import { Loading } from "@/components/Loading";
import { ToastProvider } from "@/components/Toast";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { token, isBootstrapping, bootstrap } = useAuthStore();

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if (isBootstrapping) return;
    const inAuthGroup = segments[0] === "(auth)";
    if (!token && !inAuthGroup) {
      router.replace("/(auth)/login");
    }
    if (token && inAuthGroup) {
      router.replace("/(tabs)/groups");
    }
  }, [token, segments, isBootstrapping, router]);

  if (isBootstrapping) return <Loading />;

  return (
    <ToastProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </ToastProvider>
  );
}
