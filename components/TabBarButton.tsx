import { ReactNode, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

export const TabBarButton = ({
  children,
  onPress,
  accessibilityState,
}: {
  children: ReactNode;
  onPress?: () => void;
  accessibilityState?: { selected?: boolean };
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animateTo(0.92)}
      onPressOut={() => animateTo(1)}
      style={styles.pressable}
    >
      <Animated.View
        style={[
          styles.inner,
          accessibilityState?.selected && styles.selected,
          { transform: [{ scale }] },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: { flex: 1, alignItems: "center", justifyContent: "center" },
  inner: { alignItems: "center", justifyContent: "center" },
  selected: { transform: [{ scale: 1.03 }] },
});
