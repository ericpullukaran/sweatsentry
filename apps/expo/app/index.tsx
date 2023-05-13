import React, { useLayoutEffect } from "react";
import { PlusCircleIcon, UserIcon } from "react-native-heroicons/solid";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

import { trpc } from "../utils/trpc";
import { fonts } from "~/utils/fonts";
import { Link, useRouter } from "expo-router";

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
  const trpcContext = trpc.useContext();
  const router = useRouter();
  const userQuery = trpc.user.current.useQuery(); // XX FFFS THIS IS NOT WORKING
  const currentWorkout = trpc.workouts.current.useQuery();
  const startWorkout = trpc.workouts.start.useMutation({
    onSuccess: () => {
      trpcContext.workouts.invalidate();
    },
  });

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
                fontFamily: fonts.inter.extrabold,
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
        <View className="absolute bottom-9 left-0 right-0">
          <Pressable
            onPress={async () => {
              if (!currentWorkout.data) {
                await startWorkout.mutateAsync();
              }
              router.push("create_workout");
            }}
          >
            <View className="mx-auto flex flex-row items-center justify-center rounded-full bg-[#FBBD23] p-1  shadow-lg">
              <PlusCircleIcon width={50} height={50} color={"white"} />
              <Text className="ml-1 mr-4 text-lg font-extrabold">
                {!currentWorkout.data ? "Start Workout" : "Continue"}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
