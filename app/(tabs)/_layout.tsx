import { Tabs } from "expo-router";
import { Text } from "react-native";
import { theme } from "@/utils/theme";
import { Logo } from "@/components/Logo";
import { TabBarButton } from "@/components/TabBarButton";
import { BalancesIcon, GroupsIcon, ProfileIcon } from "@/components/TabIcons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { backgroundColor: "#FFFFFF", height: 64, paddingBottom: 8 },
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerTitleStyle: { color: theme.colors.textPrimary },
        headerTitle: () => <Logo size={28} />,
      }}
    >
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color }) => <GroupsIcon color={color} />,
          tabBarButton: (props) => <TabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="balances"
        options={{
          title: "Balances",
          tabBarIcon: ({ color }) => <BalancesIcon color={color} />,
          tabBarButton: (props) => <TabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          tabBarButton: (props) => <TabBarButton {...props} />,
        }}
      />
    </Tabs>
  );
}
