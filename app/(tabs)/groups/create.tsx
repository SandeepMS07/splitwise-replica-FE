import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { ErrorText } from "@/components/ErrorText";
import { createGroup } from "@/services/groups";
import { getApiErrorMessage } from "@/services/api";

export default function CreateGroupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Group name is required.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await createGroup(name.trim());
      router.back();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>Create group</Text>
        <Text style={styles.subtitle}>Give your group a clear name.</Text>

        <TextInput
          placeholder="Group name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>{isSubmitting ? "Creating..." : "Create"}</Text>
        </TouchableOpacity>

        <ErrorText message={error} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#0F172A" },
  subtitle: { fontSize: 14, color: "#64748B", marginTop: 6, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#F8FAFC",
  },
  button: {
    backgroundColor: "#0F172A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontWeight: "600" },
});
