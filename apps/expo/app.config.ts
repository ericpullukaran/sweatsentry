import { ExpoConfig, ConfigContext } from "@expo/config";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_ZW1pbmVudC1saW9uZmlzaC04NS5jbGVyay5hY2NvdW50cy5kZXYk";

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: "Sweat Sentry",
  slug: "sweat-sentry",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#2e026d",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.activeaces.app",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#2e026d",
    },
    package: "com.activeaces.app",
  },
  extra: {
    eas: {
      projectId: "041be0b4-a860-4a1e-a1b5-eec238da6d47",
    },
    CLERK_PUBLISHABLE_KEY,
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
  scheme: "myapp",
  web: {
    bundler: "metro",
  },
});

export default defineConfig;
