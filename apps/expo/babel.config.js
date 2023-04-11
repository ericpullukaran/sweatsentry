module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            "~": "./",
          },
        },
      ],
      require.resolve("expo-router/babel"),
      "react-native-reanimated/plugin",
      "@babel/plugin-proposal-export-namespace-from",
    ],
    presets: ["babel-preset-expo"],
  };
};
