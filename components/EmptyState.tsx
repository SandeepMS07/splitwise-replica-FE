import { StyleSheet, Text, View } from "react-native";

export const EmptyState = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 16, fontWeight: "600", color: "#0F172A" },
  subtitle: { fontSize: 13, color: "#64748B", marginTop: 6, textAlign: "center" },
});
