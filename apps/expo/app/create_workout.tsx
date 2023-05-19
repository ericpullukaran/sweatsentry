import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  Image,
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
import { Formik, Form, Field, FieldArray, FormikProps } from "formik";

import DividerWithIcon from "~/components/DividerWithIcon";
import { myResolveTWConfig } from "~/utils/myResolveTWConfig";
import { useNavigation, useRouter, useSearchParams } from "expo-router";
import ExerciseCard, { EndWorkoutExercises } from "~/components/ExerciseCard";
import { RouterInputs, RouterOutputs, trpc } from "~/utils/trpc";
import useInterval from "~/utils/useInterval";
import Timer from "~/components/Timer";
import { v4 as uuid } from "uuid";
import Icon from "react-native-vector-icons/FontAwesome5";
import { fonts } from "~/utils/fonts";

type Workout = NonNullable<RouterOutputs["workouts"]["current"]>;
type EndWorkoutInput = RouterInputs["workouts"]["end"];

function CreateWorkout() {
  const router = useRouter();
  const params = useSearchParams();

  const exercisesArrayRef =
    useRef<FormikProps<{ exercises: EndWorkoutExercises[] }>>(null);

  const currentWorkout = trpc.workouts.current.useQuery();
  const endWorkout = trpc.workouts.end.useMutation();
  const trpcContext = trpc.useContext();

  const handleEndingWorkout = (values: Record<string, any>) => {
    // endWorkout.mutateAsync(values)
    console.log(
      values.exercises.map((e: any) => ({
        ...e.exercise,
        sets: e.sets.map((s: any) => s.set),
      })),
    );
    const objToSend = {
      exercises: values.exercises.map((e: any) => ({
        ...e.exercise,
        sets: e.sets.map((s: any) => s.set),
      })),
    };
    endWorkout.mutate(objToSend as any, {
      onSettled: (...args) => console.log(args),
      onSuccess: () => {
        trpcContext.workouts.invalidate();
        router.push("/");
      },
    });

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

    console.log(`xx:`, exercisesArrayRef.current?.values);

    exercisesArrayRef.current?.setValues({
      exercises: [
        ...exercisesArrayRef.current.values.exercises,
        {
          tmpId: uuid(),
          exerciseId: params.selectedExerciseId as string,
          sets: [],
        },
      ],
    });

    setTimeout(() => console.log(exercisesArrayRef.current?.values), 500);
  }, [params.selectedExerciseId]);

  return (
    <SafeAreaView className="flex h-full justify-center bg-base px-4 ">
      <ScrollView>
        {/* <Button title="BACKS" onPress={() => router.back()} /> */}

        <View className="mb-6 flex-row items-center justify-between">
          <View className="relative flex flex-row items-center">
            <Icon
              name="stop-circle"
              size={25}
              color={`#ef4444`} // TODO: I want to have red-500
            />
            <Text
              className="relative -bottom-1 ml-3 text-4xl font-bold text-white"
              style={{
                fontFamily: fonts.inter.medium,
              }}
            >
              Activity
            </Text>
          </View>

          <View>
            <TouchableOpacity className="flex h-16 w-16 items-center justify-center">
              <Image
                source={require("../assets/logo_dark.png")}
                style={{
                  height: 150,
                  resizeMode: "contain",
                }}
                className="w-full"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mx-auto flex flex-row justify-between rounded-xl bg-base-100">
          <View className="flex items-center p-4">
            <View className="flex flex-row items-center">
              <StopCircleIcon size={20} color={myResolveTWConfig("error")} />
              <Text className="ml-1 text-lg text-white">Duration</Text>
            </View>
            {currentWorkout.data ? (
              <Timer
                fromTime={currentWorkout.data.startTime}
                classes="ml-2 text-2xl font-extrabold text-white "
              />
            ) : (
              <Text className="ml-2 text-2xl font-extrabold text-white">
                00:00
              </Text> // TODO: why does this not show up
            )}
          </View>
          <View className="w-[1px] bg-white opacity-10" />

          <View className="flex items-center p-4">
            <View className="flex flex-row items-center">
              <Square3Stack3DIcon
                size={20}
                color={myResolveTWConfig("primary-content")}
              />
              <Text className="ml-1 text-lg text-white">Sets</Text>
            </View>
            <Text className="text-2xl font-extrabold text-white">2</Text>
          </View>

          <View className="w-[1px] bg-white opacity-10" />

          <View className="flex items-center p-4">
            <View className="flex flex-row items-center">
              <Icon
                name="dice-d20"
                size={17}
                color={myResolveTWConfig("primary-content")}
              />
              <Text className="ml-1 text-lg text-white">Volume</Text>
            </View>
            <Text className="text-2xl font-extrabold text-white">342kg</Text>
          </View>
        </View>

        <View className="mx-4 flex-1 pt-8">
          <Text className="mb-4 text-xl font-bold text-white">Exercises</Text>
          <View onScrollBeginDrag={() => Keyboard.dismiss()}>
            <Formik
              initialValues={{ exercises: [] }}
              // initialValues={{ sets: exerciseInfo.sets }}
              onSubmit={(values) => {
                endWorkout.mutate(values, {
                  onSettled: (...args) => console.log(args),
                  onSuccess: () => {
                    trpcContext.workouts.invalidate();
                    router.push("/");
                  },
                });
              }}
              innerRef={exercisesArrayRef}
            >
              {({
                handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
                values,
              }) => (
                <>
                  <FlatList
                    scrollEnabled={false}
                    data={values.exercises}
                    keyExtractor={(item) => item.exerciseId}
                    renderItem={({ item, index }) => (
                      <View className="mb-10">
                        <ExerciseCard
                          value={item}
                          index={index}
                          onChange={(value) =>
                            setFieldValue(`exercises[${index}]`, value)
                          }
                        />
                      </View>
                    )}
                  />

                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/exercises",
                        params: {
                          from: "/create_workout",
                        },
                      })
                    }
                    className="flex h-24 flex-row items-center justify-center rounded-xl border-2 border-dashed border-white/50"
                  >
                    <Text className="mr-2 text-lg font-bold text-white">
                      Add Exercise
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    className="mx-auto rounded-lg bg-red-400 p-5"
                  >
                    <Text className="mr-2 text-lg font-bold">End Workout</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateWorkout;
