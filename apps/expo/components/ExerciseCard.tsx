import React, { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { Formik, Form, Field, FieldArray } from "formik";
import AccordionItem from "./AccordionItem";
import SetMeasurement from "./SetMeasurement";
import { RouterInputs, trpc } from "~/utils/trpc";
import { v4 as uuidv4 } from "uuid";
import { TypeOf, object } from "zod";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

const SET_MEASUREMENT_TYPES = [
  "weight",
  "numReps",
  "time",
  "distance",
] as const;
const EMPTY_WEIGHT_REPS_SET = { weight: 0, numReps: 0 };
const EMPTY_REPS_SET = { numReps: 0 };
const EMPTY_TIME_DIST_SET = { time: 0, distance: 0 };
const EMPTY_TIME_SET = { time: 0 };
type SetType = NonNullable<
  RouterInputs["workouts"]["end"]["exercises"][number]["sets"][number]
>;
type SetTypeKeys = (typeof SET_MEASUREMENT_TYPES)[number];
const emptySetsByMeasurementType = {
  "weight-reps": { weight: 0, numReps: 0 },
  reps: { numReps: 0 },
  "time-distance": { time: 0, distance: 0 },
  time: { time: 0 },
};

const requiredFields = {
  "weight-reps": ["weight", "numReps"],
  reps: ["numReps"],
  "time-distance": ["time", "distance"],
  time: ["time"],
};

export type EndWorkoutExercises = {
  exerciseId: string;
  tmpId: string;
  notes?: string | undefined;
  sets: RouterInputs["workouts"]["end"]["exercises"][number]["sets"];
};

function ExerciseCard({
  value: exerciseInfo,
  index: exerciseIndex,
  onChange,
}: {
  value: EndWorkoutExercises;
  index: number;
  onChange: (value: EndWorkoutExercises) => void;
}) {
  const exercise = trpc.exercises.all.useQuery(undefined, {
    select(data) {
      return Object.fromEntries(data.map((e) => [e.id, e]));
    },
  });
  const curExercise = exercise.data?.[exerciseInfo.exerciseId];
  const curMesType =
    curExercise?.measurementType as keyof typeof emptySetsByMeasurementType;
  console.log(exerciseInfo.sets);

  return (
    <View className="">
      <View className=" mb-8">
        <View
          className="h-22 z-20 flex-row items-start rounded-xl bg-[#202224] p-3"
          style={styles.shadow}
        >
          <View className="mr-2 h-16 w-20 rounded-md bg-red-300"></View>
          <View className="flex-1">
            <Text className="font-extrabold text-base text-white">
              {curExercise?.name}
            </Text>
            <Text className="text-xs text-white">
              {curExercise?.description}
            </Text>
          </View>
          <View className="mr-2 self-center">
            <Text className="text-white">0/{exerciseInfo.sets.length}</Text>
          </View>
        </View>
        <View className="absolute top-16 z-10 w-full bg-base-100">
          <View className=" bg-base-300   h-14 w-full flex-row items-end justify-between rounded-xl bg-base-200 px-6 pb-1 ">
            <Text className="font-medium text-base text-white/30">
              Previous
            </Text>
            <Text className="font-medium text-base text-white/30">Weight</Text>
            <Text className="font-medium text-base text-white/30">Reps</Text>
            <Text className="font-medium text-base text-white/30">Status</Text>
          </View>
        </View>
      </View>
      <View className="w-full rounded-xl">
        <View>
          {(exerciseInfo.sets as any[]).map((set: any, index) => (
            <View
              key={index}
              className="flex-row border border-red-500 bg-base-100"
            >
              <Text className="text-xl text-white">10kgx9</Text>
              {requiredFields[curMesType].map((measurement_type) => (
                <TextInput
                  key={measurement_type}
                  className="h-10 w-20 rounded-xl border bg-white"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    onChange({
                      ...exerciseInfo,
                      sets: (exerciseInfo.sets as any[]).map((s, idx) => {
                        if (idx === index) {
                          return { ...s, [measurement_type]: Number(text) };
                        } else {
                          return s;
                        }
                      }),
                    });
                  }}
                  value={set[measurement_type].toString()}
                  // onBlur={handleBlur(`sets[${index}].measurement_type`)}
                />
              ))}

              <Pressable
                onPress={() => console.log("im a button")}
                className="h-8 w-8 rounded-lg border border-red-500"
              >
                <Text>status</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View className="h-12 bg-base-100"></View>
        <View className="h-10 rounded-b-xl bg-base-200"></View>
      </View>
      <Pressable
        onPress={() => {
          if (!curMesType) {
            return;
          }

          onChange({
            ...exerciseInfo,
            sets: [
              ...(exerciseInfo.sets as any[]),
              emptySetsByMeasurementType[curMesType],
            ],
          });
        }}
        className="h-8 rounded-lg border border-red-500"
      >
        <Text className="text-lg text-white">Add Set</Text>
      </Pressable>
    </View>
  );
}

export default ExerciseCard;
