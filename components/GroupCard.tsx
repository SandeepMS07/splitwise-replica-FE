import { Pressable, StyleSheet, Text, View } from "react-native";
import { Group } from "@/types/models";

export const GroupCard = ({ group, onPress }: { group: Group; onPress?: () => void }) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.name}>{group.name}</Text>
        <Text style={styles.meta}>{group.members?.length || 0} members</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "600", color: "#0F172A" },
  meta: { fontSize: 12, color: "#64748B", marginTop: 4 },
});
