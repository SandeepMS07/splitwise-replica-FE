import { Stack } from "expo-router";
import { theme } from "@/utils/theme";
import { Logo } from "@/components/Logo";

export default function GroupsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerTitleStyle: { color: theme.colors.textPrimary },
        headerTitle: "Groups",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="create" options={{ title: "New Group" }} />
      <Stack.Screen name="[id]/index" options={{ title: "Group" }} />
      <Stack.Screen name="[id]/add-expense" options={{ title: "Add Expense" }} />
    </Stack>
  );
}
