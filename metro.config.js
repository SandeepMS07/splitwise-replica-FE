const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Prefer browser/react-native builds (avoids Node-only axios bundle).
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

module.exports = config;
