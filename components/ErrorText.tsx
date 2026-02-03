import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { useToast } from "@/components/Toast";

export const ErrorText = ({ message }: { message?: string | null }) => {
  const toast = useToast();

  useEffect(() => {
    if (message) toast.show(message);
  }, [message, toast]);

  if (!message) return null;
  return <Text style={styles.text}>{message}</Text>;
};

const styles = StyleSheet.create({
  text: { color: "#B91C1C", marginTop: 8 },
});
