import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { GroupCard } from "@/components/GroupCard";
import { EmptyState } from "@/components/EmptyState";
import { ErrorText } from "@/components/ErrorText";
import { listGroups } from "@/services/groups";
import { getApiErrorMessage } from "@/services/api";
import { Group } from "@/types/models";

export default function GroupsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      <View style={styles.headerRow}>
        <Text style={styles.title}>Your groups</Text>
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
            <EmptyState
              title="No groups yet"
              subtitle="Create a group to start sharing expenses."
            />
          ) : null
        }
        contentContainerStyle={groups.length === 0 ? styles.emptyList : undefined}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#0F172A" },
  addButton: {
    backgroundColor: "#0F172A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 12 },
  emptyList: { flexGrow: 1, justifyContent: "center" },
});
