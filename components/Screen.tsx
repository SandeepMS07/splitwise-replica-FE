import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export const Screen = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F6F8" },
  container: { flex: 1, padding: 16 },
});
