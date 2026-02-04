import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { Loading } from "@/components/Loading";

export default function Index() {
  const { token, isBootstrapping } = useAuthStore();

  if (isBootstrapping) return <Loading />;

  if (token) {
    return <Redirect href="/(tabs)/groups" />;
  }

  return <Redirect href="/(auth)/login" />;
}
