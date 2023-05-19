import { View, Text, Pressable } from "react-native";
import React, { Fragment } from "react";
import { trpc } from "~/utils/trpc";
import { useRouter } from "expo-router";

type Props = {};

const History = (props: Props) => {
  const trpcContext = trpc.useContext();
  const workoutHistory = trpc.workouts.history.useQuery(undefined, {
    onSuccess: (data) => {
      data.forEach((d) => {
        trpcContext.workouts.get.setData(
          {
            id: d.id,
          },
          d,
        );
      });
    },
  });
  const router = useRouter();
  return (
    <View>
      <Text>History</Text>
      {workoutHistory.data?.map((workout) => {
        return (
          <Fragment key={workout.id}>
            <Pressable onPress={() => router.push(`history/${workout.id}`)}>
              <Text>{workout.name}</Text>
            </Pressable>
          </Fragment>
        );
      })}
    </View>
  );
};

export default History;
