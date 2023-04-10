import React from "react";

import { View, Image, ScrollView } from "react-native";

import SignInWithOAuth from "~/components/SignInWithOAuth";

export const SignInSignUpScreen = () => {
  return (
    <ScrollView>
      <View className="mx-8">
        <View className="mt-[15%] flex flex-row justify-center bg-success">
          <Image
            source={require("../assets/aa_blob.png")}
            style={{
              resizeMode: "contain",
            }}
            className="w-full"
          />
        </View>
      </View>
      <View className="p-4">
        <SignInWithOAuth />
      </View>
    </ScrollView>
  );
};
