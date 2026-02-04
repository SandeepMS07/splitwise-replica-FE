import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { GroupCard } from "@/components/GroupCard";
import { ErrorText } from "@/components/ErrorText";
import { listGroups } from "@/services/groups";
import { getApiErrorMessage } from "@/services/api";
import { Group } from "@/types/models";
import { theme } from "@/utils/theme";
import { Logo } from "@/components/Logo";
import { useAuthStore } from "@/store/auth";

export default function GroupsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  const loadGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listGroups();
      setGroups(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGroups();
    }, [loadGroups])
  );

  return (
    <Screen>
      <View style={styles.titleBar}>
        <Logo size={28} />
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.title}>Groups</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/groups/create")}
        >
          <Text style={styles.addButtonText}>New Group</Text>
        </TouchableOpacity>
      </View>

      <ErrorText message={error} />

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={loadGroups}
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onPress={() => router.push(`/(tabs)/groups/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyWrap}>
              <View style={styles.emptyCard}>
                <Logo size={64} />
                <Text style={styles.emptyTitle}>Start your first group</Text>
                <Text style={styles.emptySubtitle}>
                  Split expenses with friends, trips, and roommates in seconds.
                </Text>
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={() => router.push("/(tabs)/groups/create")}
                >
                  <Text style={styles.emptyButtonText}>Create group</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }
        contentContainerStyle={groups.length === 0 ? styles.emptyList : undefined}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 12, fontWeight: "700", color: theme.colors.textPrimary },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: "700", color: theme.colors.textPrimary },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 12 },
  emptyWrap: { flexGrow: 1, justifyContent: "center", alignItems: "center" },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
    width: "90%",
  },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: theme.colors.textPrimary, marginTop: 12 },
  emptySubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  emptyButtonText: { color: "#FFFFFF", fontWeight: "600" },
  emptyList: { flexGrow: 1, justifyContent: "center" },
});
