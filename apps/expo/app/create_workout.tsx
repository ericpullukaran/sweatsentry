import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
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
import {
  Form,
  FieldArray,
  FieldArrayInstance,
  FieldArrayItem,
} from "houseform";
import DividerWithIcon from "~/components/DividerWithIcon";
import { myResolveTWConfig } from "~/utils/myResolveTWConfig";
import { useNavigation, useRouter, useSearchParams } from "expo-router";
import ExerciseCard, { EndWorkoutExercises } from "~/components/ExerciseCard";
import { RouterInputs, RouterOutputs, trpc } from "~/utils/trpc";
import useInterval from "~/utils/useInterval";
import Timer from "~/components/Timer";

type Workout = NonNullable<RouterOutputs["workouts"]["current"]>;
type EndWorkoutInput = RouterInputs["workouts"]["end"];

const a: EndWorkoutInput = {
  exercises: [
    {
      exerciseId: "1",
      sets: [
        { weight: 1, numReps: 1 },
        { weight: 12.5, numReps: 4 },
      ],
      notes: "this was easy pz",
    },
    {
      exerciseId: "2",
      sets: [{ time: 1, distance: 1 }],
      notes: "this was easy pz",
    },
  ],
};

function CreateWorkout() {
  const router = useRouter();
  const params = useSearchParams();

  const exercisesArrayRef =
    useRef<FieldArrayInstance<{ exercise: EndWorkoutExercises }>>(null);

  const currentWorkout = trpc.workouts.current.useQuery();
  const endWorkout = trpc.workouts.end.useMutation();

  const handleEndingWorkout = (values: Record<string, any>) => {
    // endWorkout.mutateAsync(values)
    console.log(JSON.stringify(values));

    Alert.alert("Form was submitted with: " + JSON.stringify(values));
  };

  useEffect(() => {
    if (!params.selectedExerciseId) return;
    console.log(
      "runingn effect",
      exercisesArrayRef,
      {
        exerciseId: params.selectedExerciseId as string,
        sets: [],
      },
      params,
    );

    exercisesArrayRef.current?.add({
      exercise: {
        exerciseId: params.selectedExerciseId as string,
        sets: [],
      },
    });
    setTimeout(() => console.log(exercisesArrayRef.current?.value), 500);
  }, [params.selectedExerciseId]);

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
            <Text>
              {currentWorkout.data && (
                <Timer fromTime={currentWorkout.data.startTime} />
              )}
            </Text>
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
          <Form onSubmit={handleEndingWorkout}>
            {({ isValid, submit }) => (
              <>
                <FieldArray<{ exercise: EndWorkoutExercises }>
                  name="exercises"
                  preserveValue={true}
                  ref={exercisesArrayRef}
                >
                  {({ value, add, remove }) => (
                    <>
                      {console.log("inside fa", value)}
                      <FlatList
                        scrollEnabled={false}
                        data={value}
                        keyExtractor={(item) => item.exercise.exerciseId}
                        renderItem={({ item, index }) => (
                          <>
                            <FieldArrayItem
                              key={`${item.exercise.exerciseId}`}
                              name={`exercises[${index}].exercise`}
                              initialValue={item.exercise}
                            >
                              {({ setValue, value, onBlur, ...rest }) => (
                                <>
                                  <ExerciseCard value={value} index={index} />
                                </>
                              )}
                            </FieldArrayItem>
                          </>
                        )}
                      />
                      {/* {value.map((exercise, idx) => {
                        <ExerciseCard value={exercise} index={idx} />;
                      })} */}
                    </>
                  )}
                </FieldArray>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/exercises",
                      params: {
                        from: "/create_workout",
                      },
                    })
                  }
                  className="mt-8 flex h-24 flex-row items-center justify-center rounded-xl border-2 border-dashed border-neutral/50"
                >
                  <Text className="mr-2 text-lg font-bold">Add Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => submit()}
                  className=" mt-4 bg-red-400 p-5"
                >
                  <Text className="mr-2 text-lg font-bold">End Workout</Text>
                </TouchableOpacity>
              </>
            )}
          </Form>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default CreateWorkout;
