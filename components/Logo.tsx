import { Image, ImageStyle, StyleSheet, View, ViewStyle } from "react-native";

const logo = require("@/assets/logo.png");

type LogoProps = {
  size?: number;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
};

export const Logo = ({ size = 48, style, imageStyle }: LogoProps) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={logo}
        style={[{ width: size, height: size }, imageStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
