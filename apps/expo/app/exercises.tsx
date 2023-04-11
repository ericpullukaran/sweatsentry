import { Stack } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import DividerWithIcon from "~/components/DividerWithIcon";
import { myResolveTWConfig } from "~/utils/myResolveTWConfig";
import { trpc } from "~/utils/trpc";

function Exercises() {
  const [text, setText] = useState("");
  const exercisesQuery = trpc.exercises.all.useQuery();

  return (
    <>
      <View className="flex h-full justify-center">
        <View className="mx-4 mt-8">
          <View className="flex flex-row items-start justify-center ">
            <Text className="text-center text-5xl font-extrabold text-primary">
              Exercises
            </Text>
          </View>
        </View>
        <View className="mx-4 flex-1 pt-8">
          <View className="flex flex-row items-center">
            <MagnifyingGlassIcon
              className=""
              height={17}
              color={myResolveTWConfig("primary-content")}
            />
            <Text className=" ml-1 text-lg font-extrabold text-primary-content/50">
              Search
            </Text>
          </View>
          <View className="mb-8">
            <TextInput
              className="block w-full rounded-full border-2 border-gray-200 px-4 py-3 text-sm"
              onChangeText={setText}
              value={text}
              placeholder="Enter some text"
            />
          </View>
          {exercisesQuery.data?.map((exercise) => (
            <View
              key={exercise.id}
              className="mb-4 h-24 rounded-md border-2 border-red-300"
            >
              <View className="flex h-full flex-row p-3">
                <View className=" mr-2 w-20 rounded-md bg-red-300"></View>
                <View>
                  <Text className="text-xl font-extrabold">
                    {exercise.name}
                  </Text>
                  <Text>{exercise.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

export default Exercises;
