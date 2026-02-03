import { Stack } from "expo-router";

export default function GroupsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerTitleStyle: { color: "#0F172A" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Groups" }} />
      <Stack.Screen name="create" options={{ title: "New Group" }} />
      <Stack.Screen name="[id]/index" options={{ title: "Group" }} />
      <Stack.Screen name="[id]/add-expense" options={{ title: "Add Expense" }} />
    </Stack>
  );
}
