import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { ExpenseItem } from "@/components/ExpenseItem";
import { EmptyState } from "@/components/EmptyState";
import { ErrorText } from "@/components/ErrorText";
import { getGroup } from "@/services/groups";
import { listExpenses } from "@/services/expenses";
import { getApiErrorMessage } from "@/services/api";
import { Group } from "@/types/models";

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Group["expenses"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadGroup = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const [groupData, expenseData] = await Promise.all([
        getGroup(id),
        listExpenses(id),
      ]);
      setGroup(groupData);
      setExpenses(expenseData);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadGroup();
    }, [loadGroup])
  );

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{group?.name || "Group"}</Text>
          <Text style={styles.subtitle}>{group?.members?.length || 0} members</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push(`/(tabs)/groups/${id}/add-expense`)}
        >
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      <ErrorText message={error} />

      <Text style={styles.sectionTitle}>Members</Text>
      <View style={styles.membersWrap}>
        {group?.members?.map((member) => (
          <View key={member.id} style={styles.memberChip}>
            <Text style={styles.memberText}>
              {member.name || member.email || "Member"}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Expenses</Text>
      <FlatList
        data={expenses || []}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={loadGroup}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        ListEmptyComponent={
          !loading ? (
            <EmptyState
              title="No expenses yet"
              subtitle="Add an expense to start tracking balances."
            />
          ) : null
        }
        contentContainerStyle={!expenses?.length ? styles.emptyList : undefined}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#0F172A" },
  subtitle: { fontSize: 12, color: "#64748B", marginTop: 4 },
  addButton: {
    backgroundColor: "#0F172A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 12 },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#0F172A", marginTop: 16, marginBottom: 8 },
  membersWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  memberChip: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  memberText: { fontSize: 12, color: "#0F172A" },
  emptyList: { flexGrow: 1, justifyContent: "center" },
});
