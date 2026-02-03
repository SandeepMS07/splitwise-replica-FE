import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "@/components/Screen";
import { useAuthStore } from "@/store/auth";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name || "-"}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || "-"}</Text>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
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
  title: { fontSize: 20, fontWeight: "700", color: "#0F172A", marginBottom: 16 },
  label: { fontSize: 12, color: "#64748B", marginTop: 12 },
  value: { fontSize: 14, fontWeight: "600", color: "#0F172A", marginTop: 4 },
  button: {
    backgroundColor: "#0F172A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "600" },
});
