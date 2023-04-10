import React from "react";

import { View, Image } from "react-native";

import SignInWithOAuth from "~/components/SignInWithOAuth";

export const SignInSignUpScreen = () => {
  return (
    <>
      <View className="mx-8">
        <View className="mt-[35%] flex flex-row justify-center">
          <Image
            source={require("../assets/aa_blob.png")}
            style={{
              resizeMode: "contain",
              width: "100%",
            }}
            className="w-full"
          />
        </View>
      </View>
      <View className="h-full p-4">
        <SignInWithOAuth />
      </View>
    </>
  );
};
