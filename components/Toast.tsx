import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { theme } from "@/utils/theme";

export type ToastOptions = {
  durationMs?: number;
};

type ToastContextValue = {
  show: (message: string, options?: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const hide = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -10,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => setMessage(null));
  }, [opacity, translateY]);

  const show = useCallback(
    (text: string, options?: ToastOptions) => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
      setMessage(text);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();

      const duration = options?.durationMs ?? 2400;
      hideTimer.current = setTimeout(() => {
        hide();
      }, duration);
    },
    [hide, opacity, translateY]
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? (
        <View pointerEvents="none" style={styles.wrapper}>
          <Animated.View
            style={[
              styles.toast,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            <Text style={styles.text}>{message}</Text>
          </Animated.View>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    alignItems: "center",
  },
  toast: {
    backgroundColor: theme.colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    maxWidth: "100%",
    shadowColor: theme.colors.textPrimary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
