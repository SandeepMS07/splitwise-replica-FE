import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "@/utils/theme";

export const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={theme.colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
