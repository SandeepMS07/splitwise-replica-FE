import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { ErrorText } from "@/components/ErrorText";
import { getGroup } from "@/services/groups";
import { createExpense } from "@/services/expenses";
import { getApiErrorMessage } from "@/services/api";
import { expenseSchema } from "@/utils/validation";
import { Group } from "@/types/models";

export default function AddExpenseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [group, setGroup] = useState<Group | null>(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidById, setPaidById] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadGroup = useCallback(async () => {
    if (!id) return;
    try {
      const data = await getGroup(id);
      setGroup(data);
      if (!paidById && data.members?.length) {
        setPaidById(data.members[0].id);
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }, [id, paidById]);

  useFocusEffect(
    useCallback(() => {
      loadGroup();
    }, [loadGroup])
  );

  const handleSubmit = async () => {
    const numericAmount = Number(amount);
    const parsed = expenseSchema.safeParse({
      description,
      amount: numericAmount,
      paidById,
    });
    if (!parsed.success) {
      setError("Fill description, amount, and who paid.");
      return;
    }
    if (!id) return;
    if (!group?.members?.length) {
      setError("Group has no members.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const memberCount = group.members.length;
      const baseShare = Number((numericAmount / memberCount).toFixed(2));
      const splits = group.members.map((member, index) => {
        const isLast = index === memberCount - 1;
        const amount = isLast
          ? Number((numericAmount - baseShare * (memberCount - 1)).toFixed(2))
          : baseShare;
        return { userId: member.id, amount };
      });
      await createExpense({
        groupId: id,
        description: description.trim(),
        amount: numericAmount,
        currency: "USD",
        paidById,
        splits,
      });
      router.back();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Add expense</Text>
        <Text style={styles.subtitle}>{group?.name || "Group"}</Text>

        <TextInput
          placeholder="Description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          placeholder="Amount"
          keyboardType="decimal-pad"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.sectionTitle}>Paid by</Text>
        <View style={styles.memberList}>
          {group?.members?.map((member) => (
            <TouchableOpacity
              key={member.id}
              style={[
                styles.memberOption,
                paidById === member.id && styles.memberOptionSelected,
              ]}
              onPress={() => setPaidById(member.id)}
            >
              <Text
                style={
                  paidById === member.id ? styles.memberTextSelected : styles.memberText
                }
              >
                {member.name || member.email || "Member"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>{isSubmitting ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>

        <ErrorText message={error} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 24 },
  title: { fontSize: 20, fontWeight: "700", color: "#0F172A" },
  subtitle: { fontSize: 12, color: "#64748B", marginTop: 4, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F8FAFC",
  },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#0F172A", marginTop: 10 },
  memberList: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  memberOption: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
  },
  memberOptionSelected: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  memberText: { fontSize: 12, color: "#0F172A" },
  memberTextSelected: { fontSize: 12, color: "#FFFFFF" },
  button: {
    backgroundColor: "#0F172A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontWeight: "600" },
});
