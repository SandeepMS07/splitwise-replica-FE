import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, View, ViewStyle } from "react-native";
import { theme } from "@/utils/theme";

export const Screen = ({
  children,
  style,
  contentStyle,
}: {
  children: ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}) => {
  return (
    <SafeAreaView style={[styles.safe, style]}>
      <View style={[styles.container, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1, padding: 16 },
});
