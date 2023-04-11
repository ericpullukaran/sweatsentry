import { useOAuth } from "@clerk/clerk-expo";
import { UserIcon } from "react-native-heroicons/outline";
import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useWarmUpBrowser } from "../utils/useWarmUpBrowser";
import DividerWithIcon from "./DividerWithIcon";

const SignInWithOAuth = () => {
  useWarmUpBrowser();
  const facebookOAuth = useOAuth({ strategy: "oauth_facebook" });
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const appleOAuth = useOAuth({ strategy: "oauth_apple" });

  const handleSignInWithPress = React.useCallback(
    async (authType: "google" | "facebook" | "apple") => {
      try {
        let authHandler = facebookOAuth.startOAuthFlow;
        if (authType === "facebook") {
          authHandler = facebookOAuth.startOAuthFlow;
        } else if (authType === "google") {
          authHandler = googleOAuth.startOAuthFlow;
        } else if (authType === "apple") {
          authHandler = appleOAuth.startOAuthFlow;
        }

        const { createdSessionId, setActive } = await authHandler();
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
          throw new Error(
            "There are unmet requirements, modify this else to handle them",
          );
        }
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
        console.log("error signing in", err);
      }
    },
    [],
  );

  return (
    <>
      <Text className="p-4 text-center text-4xl">
        <Text className="font-extrabold text-orange-400">Ace</Text> your fitness
        goals
      </Text>

      <DividerWithIcon>
        <UserIcon color={"black"} width={20} />
      </DividerWithIcon>

      <View className="flex-row justify-center gap-4">
        <TouchableOpacity
          onPress={() => handleSignInWithPress("facebook")}
          className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-[#ededed]"
        >
          <Image
            source={require("~/assets/f_logo_RGB-Blue_58.png")}
            style={{
              resizeMode: "contain",
            }}
            className="h-12 w-12"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSignInWithPress("google")}
          className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-[#ededed]"
        >
          <Image
            source={require("~/assets/google.png")}
            style={{
              resizeMode: "contain",
            }}
            className="h-12 w-12"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSignInWithPress("apple")}
          className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-[#ededed]"
        >
          <Image
            source={require("~/assets/apple.png")}
            style={{
              resizeMode: "contain",
            }}
            className="h-12 w-12"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignInWithOAuth;
