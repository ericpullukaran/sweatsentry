import { TRPCProvider } from "~/utils/trpc";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SignInSignUpScreen } from "./signin";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "~/utils/cache";
import Constants from "expo-constants";
import { SplashScreen, Stack } from "expo-router";
import { fonts, useFonts } from "~/utils/fonts";
import React, { useEffect, Suspense } from "react";
import { setCustomText } from "react-native-global-props";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

export const unstable_settings = {
  initialRouteName: "index",
};

const Layout: React.FC = () => {
  const [fontsLoaded] = useFonts();

  useEffect(() => {
    if (fontsLoaded) {
      setCustomText({
        style: {
          color: "white",
          fontFamily: fonts.inter.regular,
        },
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TamaguiProvider config={config}>
        <SignedIn>
          <TRPCProvider>
            <SafeAreaProvider>
              {/* ! Don't put any elements around the <Stack /> here. You might looks several hours of your life */}
              <Stack>
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false,
                    animation: "fade",
                  }}
                />
                <Stack.Screen
                  name="create_workout"
                  options={{
                    // Set the presentation mode to modal for our modal route.
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="exercises"
                  options={{
                    // Set the presentation mode to modal for our modal route.
                    presentation: "modal",
                    headerShown: false,
                  }}
                />
              </Stack>
              <StatusBar style="dark" />
            </SafeAreaProvider>
          </TRPCProvider>
        </SignedIn>
        <SignedOut>
          <SignInSignUpScreen />
        </SignedOut>
      </TamaguiProvider>
    </ClerkProvider>
  );
};

export default Layout;
