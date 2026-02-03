import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#1E293B" />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
