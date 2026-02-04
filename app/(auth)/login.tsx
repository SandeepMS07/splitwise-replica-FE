import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { Screen } from "@/components/Screen";
import { AuthBackdrop } from "@/components/AuthBackdrop";
import { Logo } from "@/components/Logo";
import { EyeIcon } from "@/components/EyeIcon";
import { useAuthStore } from "@/store/auth";
import { loginSchema } from "@/utils/validation";
import { theme } from "@/utils/theme";

export default function LoginScreen() {
  const { login, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    clearError();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const errors: { email?: string; password?: string } = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "email") errors.email = "Enter a valid email.";
        if (field === "password") errors.password = "Password must be at least 6 characters.";
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      await login(email.trim().toLowerCase(), password);
    } catch {
      // Error already set in store.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen style={styles.screen} contentStyle={styles.content}>
      <AuthBackdrop />
      <View style={styles.card}>
        <Logo size={56} style={styles.logo} />
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue.</Text>

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.input, fieldErrors.email && styles.inputError]}
          value={email}
          onChangeText={setEmail}
        />
        {fieldErrors.email ? <Text style={styles.fieldError}>{fieldErrors.email}</Text> : null}
        <View style={styles.passwordWrap}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={[styles.input, styles.inputWithIcon, fieldErrors.password && styles.inputError]}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <EyeIcon open={showPassword} />
          </TouchableOpacity>
        </View>
        {fieldErrors.password ? (
          <Text style={styles.fieldError}>{fieldErrors.password}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>{isSubmitting ? "Signing in..." : "Sign In"}</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.fieldError}>{error}</Text> : null}

        <View style={styles.footer}>
          <Text style={styles.footerText}>No account?</Text>
          <Link href="/(auth)/register" style={styles.footerLink}>
            Create one
          </Link>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.background },
  content: { justifyContent: "center" },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    padding: 24,
    borderRadius: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  logo: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "700", color: theme.colors.textPrimary },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 6, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
  },
  inputWithIcon: { paddingRight: 44 },
  passwordWrap: { position: "relative" },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 6,
    height: 40,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  inputError: { borderColor: "#DC2626" },
  fieldError: { color: "#DC2626", marginTop: -6, marginBottom: 10, fontSize: 12 },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontWeight: "600" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  footerText: { color: theme.colors.textSecondary, marginRight: 6 },
  footerLink: { color: theme.colors.textPrimary, fontWeight: "600" },
});
