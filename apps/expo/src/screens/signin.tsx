import React from "react";

import { View, Image } from "react-native";

import SignInWithOAuth from "../components/SignInWithOAuth";

export const SignInSignUpScreen = () => {
  return (
    <>
      <View className="mt-[35%] flex flex-row justify-center">
        <Image
          source={require("../../assets/aa_blob.png")}
          style={{
            resizeMode: "contain",
          }}
          className="h-72 w-72"
        />
      </View>
      <View className="h-full p-4">
        <SignInWithOAuth />
      </View>
    </>
  );
};
