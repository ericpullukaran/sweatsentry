import React, { useState } from "react";
import {
  Button,
  Keyboard,
  Pressable,
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
import { useNavigation, useRouter } from "expo-router";
import ExerciseCard from "~/components/ExerciseCard";
import { RouterInputs, RouterOutputs, trpc } from "~/utils/trpc";
import useInterval from "~/utils/useInterval";

const getFormattedTime = (startTime: Date) => {
  const elapsedSeconds = (Date.now() - startTime.getTime()) / 1000;
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = Math.floor(elapsedSeconds % 60);
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return formattedTime;
};

type Workout = NonNullable<RouterOutputs["workouts"]["current"]>;
type EndWorkoutInput = NonNullable<RouterInputs["workouts"]["end"]>;

let a: EndWorkoutInput = {
  exercises: [{ exerciseId: "1", sets, notes }],
};

function CreateWorkout() {
  const router = useRouter();
  const currentWorkout = trpc.workouts.current.useQuery();
  const [duration, setDuration] = useState<string>();

  useInterval(() => {
    if (currentWorkout.data) {
      setDuration(getFormattedTime(currentWorkout.data.startTime));
    }
  }, 1000);

  return (
    <SafeAreaView className="flex h-full justify-center">
      <Button title="BACKS" onPress={() => router.back()} />
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
            <Text>{duration}</Text>
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
            onPress={() => router.push("exercises")}
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
