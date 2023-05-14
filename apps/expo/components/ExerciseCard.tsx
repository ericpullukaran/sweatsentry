import React, { useRef, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import {
  FieldArray,
  FieldArrayInstance,
  FieldArrayItem,
  useFormContext,
} from "houseform";
import AccordionItem from "./AccordionItem";
import SetMeasurement from "./SetMeasurement";
import { RouterInputs, trpc } from "~/utils/trpc";
import { v4 as uuidv4 } from "uuid";
import { object } from "zod";

const EMPTY_SET = { weight: 0, numReps: 0 };
type SetType = NonNullable<
  RouterInputs["workouts"]["end"]["exercises"][number]["sets"][number]
>;

export type EndWorkoutExercises = {
  exerciseId: string;
  tmpId: string;
  notes?: string | undefined;
  sets: RouterInputs["workouts"]["end"]["exercises"][number]["sets"];
};

function ExerciseCard({
  value: exerciseInfo,
  index: exerciseIndex,
}: {
  value: EndWorkoutExercises;
  index: number;
}) {
  console.log("useFormContext", JSON.stringify(exerciseInfo));
  const exercise = trpc.exercises.all.useQuery(undefined, {
    select(data) {
      return Object.fromEntries(data.map((e) => [e.id, e]));
    },
  });
  const curExercise = exercise.data?.[exerciseInfo.exerciseId];

  const setArrayRef = useRef<FieldArrayInstance>(null);

  return (
    <View>
      <AccordionItem
        header={
          <>
            <View className="mr-2 h-16 w-20 rounded-md bg-red-300"></View>
            <View className="flex-1">
              <Text className="text-base font-extrabold">
                {curExercise?.name}
              </Text>
              <Text className="text-xs">{curExercise?.description}</Text>
            </View>
            <View className="mr-2">
              <Text>0/{exerciseInfo.sets.length}</Text>
            </View>
          </>
        }
        body={
          <>
            <FieldArray<{ set: SetType & { id: string } }>
              name={`exercises[${exerciseIndex}].sets`}
              ref={setArrayRef}
            >
              {({ value, add, remove }) => (
                <>
                  <FlatList
                    scrollEnabled={false}
                    data={value}
                    keyExtractor={(item) => item.set.id}
                    renderItem={({ item, index }) => (
                      <>
                        <FieldArrayItem
                          key={`${item.set.id}`}
                          name={`exercises[${exerciseIndex}].sets[${index}].set`}
                          initialValue={item.set}
                        >
                          {({ setValue, value, onBlur, ...rest }) => (
                            <>
                              <SetMeasurement
                                num={index}
                                value={value}
                                onChange={(v) => setValue(v)}
                                remove={remove}
                              />
                            </>
                          )}
                        </FieldArrayItem>
                      </>
                    )}
                  />
                </>
              )}
            </FieldArray>
          </>
        }
        footer={
          <Pressable
            onPress={() =>
              setArrayRef.current?.add({ set: { ...EMPTY_SET, id: uuidv4() } })
            }
            className="mt-3 items-center"
          >
            <Text className="text-lg font-extrabold">Add Set</Text>
          </Pressable>
        }
      />
    </View>
  );
}

export default ExerciseCard;
