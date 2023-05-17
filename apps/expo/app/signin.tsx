import React from "react";

import { View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignInWithOAuth from "~/components/SignInWithOAuth";

export const SignInSignUpScreen = () => {
  return (
    <ScrollView>
      <SafeAreaView className="flex h-screen justify-center">
        <View className="mx-8 mb-8">
          <View>
            <Image
              source={require("../assets/aa_blob.png")}
              style={{
                height: 300,
                resizeMode: "contain",
              }}
              className="w-full bg-primary"
            />
          </View>
        </View>
        <View className="p-4">
          <SignInWithOAuth />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
