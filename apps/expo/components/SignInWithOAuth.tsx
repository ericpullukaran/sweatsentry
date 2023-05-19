import { useOAuth } from "@clerk/clerk-expo";
import { UserIcon } from "react-native-heroicons/outline";
import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useWarmUpBrowser } from "../utils/useWarmUpBrowser";
import DividerWithIcon from "./DividerWithIcon";
import Icon from "react-native-vector-icons/FontAwesome";

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
    <View>
      <Text className="p-4 text-center text-5xl font-extrabold text-white">
        Active Aces
      </Text>

      <DividerWithIcon className="opacity-5">
        <UserIcon color={"white"} width={20} />
      </DividerWithIcon>

      <View className="mt-6 flex-row justify-around ">
        <TouchableOpacity
          onPress={() => handleSignInWithPress("facebook")}
          className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#1877F2]"
        >
          <View className="relative top-2">
            <Icon name="facebook" size={50} color={"white"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSignInWithPress("google")}
          className="flex h-16 w-16 items-center justify-center rounded-lg"
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
          className="flex h-16 w-16 items-center justify-center rounded-lg"
        >
          <Icon name="apple" size={55} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInWithOAuth;
