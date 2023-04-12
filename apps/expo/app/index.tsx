import React from "react";
import { UserIcon } from "react-native-heroicons/solid";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

import { trpc } from "../utils/trpc";
import { fonts } from "~/utils/fonts";

const SignOut = () => {
  const { signOut } = useAuth();
  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

const HomeScreen = () => {
  const userQuery = trpc.user.current.useQuery(); // XX FFFS THIS IS NOT WORKING

  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <View className="flex-row justify-end">
          <View className="flex-1">
            <Text className="pb-2 text-sm">Welcome... (default font)</Text>
            <Text
              className="pb-2 text-sm"
              style={{
                fontFamily: fonts.inter.regular,
              }}
            >
              Welcome... (Inter)
            </Text>
            <Text
              className="text-5xl text-[#FBBD23]"
              style={{
                fontFamily: fonts.inter.semiBold,
              }}
            >
              {userQuery.data?.firstName || "loading..."}
            </Text>
          </View>
          <View>
            <TouchableOpacity className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#ededed]">
              <UserIcon color={"black"} width={40} />
            </TouchableOpacity>
          </View>
        </View>

        <SignOut />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
