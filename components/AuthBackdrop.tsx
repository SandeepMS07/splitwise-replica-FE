import { StyleSheet, View } from "react-native";

export const AuthBackdrop = () => {
  return (
    <View pointerEvents="none" style={styles.wrapper}>
      <View style={styles.gradientLayerA} />
      <View style={styles.gradientLayerB} />
      <View style={styles.ringOuter} />
      <View style={styles.ringInner} />
      <View style={styles.scanline} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0A0F1E",
    overflow: "hidden",
  },
  gradientLayerA: {
    position: "absolute",
    top: -120,
    left: -80,
    right: -40,
    height: 320,
    backgroundColor: "rgba(16, 185, 129, 0.18)",
    transform: [{ rotate: "-6deg" }],
  },
  gradientLayerB: {
    position: "absolute",
    bottom: -140,
    left: -60,
    right: -60,
    height: 360,
    backgroundColor: "rgba(37, 99, 235, 0.16)",
    transform: [{ rotate: "8deg" }],
  },
  ringOuter: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
    top: -40,
    right: -140,
  },
  ringInner: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(125, 211, 252, 0.3)",
    top: 40,
    right: -80,
  },
  scanline: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 120,
    top: 140,
    backgroundColor: "rgba(148, 163, 184, 0.05)",
  },
});
