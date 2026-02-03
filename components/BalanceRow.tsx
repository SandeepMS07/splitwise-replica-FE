import { StyleSheet, Text, View } from "react-native";
import { Balance } from "@/types/models";
import { formatCurrency } from "@/utils/format";

export const BalanceRow = ({ balance }: { balance: Balance }) => {
  const from = balance.fromUser.name || balance.fromUser.email || "Someone";
  const to = balance.toUser.name || balance.toUser.email || "Someone";
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>
          {from} owes {to}
        </Text>
        {balance.groupName ? <Text style={styles.meta}>{balance.groupName}</Text> : null}
      </View>
      <Text style={styles.amount}>{formatCurrency(balance.amount)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 14, color: "#0F172A", fontWeight: "600" },
  meta: { fontSize: 12, color: "#64748B", marginTop: 4 },
  amount: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
});
