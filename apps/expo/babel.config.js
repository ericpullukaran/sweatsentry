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
    ],
    presets: ["babel-preset-expo"],
  };
};
