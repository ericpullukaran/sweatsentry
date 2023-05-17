import { View, Text } from "react-native";
import React from "react";
import { useRouter, useSearchParams } from "expo-router";
import { trpc } from "~/utils/trpc";

type Props = {};

const HistoryWorkoutItem = (props: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const workoutHistory = trpc.workouts.get.useQuery({
    id: params.workoutId as string,
  });
  console.log(params);

  return (
    <View>
      <Text>HistoryWorkoutItem</Text>
      <Text>{workoutHistory.data?.name}</Text>
    </View>
  );
};

export default HistoryWorkoutItem;
