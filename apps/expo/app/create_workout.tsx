import React from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ChartBarIcon,
  Square3Stack3DIcon,
  StopCircleIcon,
  TrophyIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import DividerWithIcon from "~/components/DividerWithIcon";
import { myResolveTWConfig } from "~/utils/myResolveTWConfig";
import { useRouter } from "expo-router";
import ExerciseCard from "~/components/ExerciseCard";

function CreateWorkout() {
  const navigation = useRouter();

  return (
    <SafeAreaView className="flex h-full justify-center">
      <View className="mx-4 mt-8">
        <View className="flex flex-row items-start justify-center ">
          <View className="rounded-lg bg-red-500 p-1">
            <Text className="font-extrabold text-white">Record</Text>
          </View>
          <Text className="text-center text-5xl font-extrabold text-primary">
            Activity
          </Text>
        </View>
        <View className="">
          <DividerWithIcon>
            <ChartBarIcon color={myResolveTWConfig("primary-content")} />
          </DividerWithIcon>
        </View>
        <View className="flex flex-row justify-evenly">
          <View className="flex flex-row items-center gap-2">
            <StopCircleIcon color={myResolveTWConfig("error")} />
            <Text>5:34</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <Square3Stack3DIcon color={myResolveTWConfig("primary-content")} />
            <Text>2 sets</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <TrophyIcon color={myResolveTWConfig("primary-content")} />
            <Text>342kg Volume</Text>
          </View>
        </View>
      </View>
      <View className="mx-4 flex-1 pt-8">
        <Text className="mb-4 text-3xl font-extrabold text-primary">
          Exercises
        </Text>
        <ScrollView onScrollBeginDrag={() => Keyboard.dismiss()}>
          <ExerciseCard />
          <TouchableOpacity
            onPress={() => navigation.push("exercises")}
            className="mt-8 flex h-24 flex-row items-center justify-center rounded-xl border-2 border-dashed border-neutral/50"
          >
            <Text className="mr-2 text-lg font-bold">Add Exercise</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default CreateWorkout;
