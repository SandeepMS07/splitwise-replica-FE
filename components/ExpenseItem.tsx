import { StyleSheet, Text, View } from "react-native";
import { Expense } from "@/types/models";
import { formatCurrency } from "@/utils/format";
import { theme } from "@/utils/theme";

export const ExpenseItem = ({ expense }: { expense: Expense }) => {
  const paidBy = expense.paidBy?.name || expense.paidBy?.email || "Someone";
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>{expense.description}</Text>
        <Text style={styles.meta}>Paid by {paidBy}</Text>
      </View>
      <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
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
  title: { fontSize: 14, color: theme.colors.textPrimary, fontWeight: "600" },
  meta: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 },
  amount: { fontSize: 14, fontWeight: "700", color: theme.colors.textPrimary },
});
