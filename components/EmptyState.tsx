import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/utils/theme";

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
  title: { fontSize: 16, fontWeight: "600", color: theme.colors.textPrimary },
  subtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 6,
    textAlign: "center",
  },
});
