import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { Screen } from "@/components/Screen";
import { EmptyState } from "@/components/EmptyState";
import { ErrorText } from "@/components/ErrorText";
import { BalanceRow } from "@/components/BalanceRow";
import { listBalances } from "@/services/balances";
import { listGroups } from "@/services/groups";
import { createSettlement } from "@/services/settlements";
import { getApiErrorMessage } from "@/services/api";
import { Balance, Group } from "@/types/models";
import { theme } from "@/utils/theme";

export default function BalancesScreen() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settlingId, setSettlingId] = useState<string | null>(null);

  const loadBalances = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const groupData = await listGroups();
      setGroups(groupData);
      const groupId = activeGroupId || groupData[0]?.id;
      if (!groupId) {
        setBalances([]);
        return;
      }
      setActiveGroupId(groupId);
      const data = await listBalances(groupId);
      setBalances(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [activeGroupId]);

  useFocusEffect(
    useCallback(() => {
      loadBalances();
    }, [loadBalances])
  );

  const handleSettle = async (balance: Balance) => {
    if (!balance.groupId || !balance.fromUser?.id || !balance.toUser?.id) return;
    const key = balance.id || `${balance.groupId}-${balance.fromUser.id}-${balance.toUser.id}`;
    setSettlingId(key);
    try {
      await createSettlement({
        groupId: balance.groupId,
        fromUserId: balance.fromUser.id,
        toUserId: balance.toUser.id,
        amount: balance.amount,
      });
      await loadBalances();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSettlingId(null);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Balances</Text>
      <Text style={styles.subtitle}>Keep track of who owes whom.</Text>

      <View style={styles.groupSelector}>
        {groups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={[
              styles.groupChip,
              activeGroupId === group.id && styles.groupChipActive,
            ]}
            onPress={() => setActiveGroupId(group.id)}
          >
            <Text
              style={
                activeGroupId === group.id
                  ? styles.groupChipTextActive
                  : styles.groupChipText
              }
            >
              {group.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ErrorText message={error} />

      <FlatList
        data={balances.filter((item) => item && item.fromUser && item.toUser)}
        keyExtractor={(item) =>
          item?.id || `${item?.groupId || "group"}-${item?.fromUser?.id || "from"}-${item?.toUser?.id || "to"}`
        }
        refreshing={loading}
        onRefresh={loadBalances}
        renderItem={({ item }) => (
          item?.fromUser && item?.toUser ? (
            <View style={styles.balanceCard}>
              <BalanceRow balance={item} />
              <TouchableOpacity
                style={styles.settleButton}
                onPress={() => handleSettle(item)}
                disabled={
                  settlingId ===
                  (item.id || `${item.groupId}-${item.fromUser.id}-${item.toUser.id}`)
                }
              >
                <Text style={styles.settleButtonText}>
                  {settlingId ===
                  (item.id || `${item.groupId}-${item.fromUser.id}-${item.toUser.id}`)
                    ? "Settling..."
                    : "Mark Settled"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
        ListEmptyComponent={
          !loading ? (
            <EmptyState
              title="All settled"
              subtitle="No balances due right now."
            />
          ) : null
        }
        contentContainerStyle={balances.length === 0 ? styles.emptyList : undefined}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "700", color: theme.colors.textPrimary },
  subtitle: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 4, marginBottom: 16 },
  groupSelector: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  groupChip: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
  },
  groupChipActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  groupChipText: { fontSize: 12, color: theme.colors.textPrimary },
  groupChipTextActive: { fontSize: 12, color: "#FFFFFF" },
  balanceCard: { marginBottom: 6 },
  settleButton: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 8,
  },
  settleButtonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 12 },
  emptyList: { flexGrow: 1, justifyContent: "center" },
});
