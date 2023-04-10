import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function ExerciseCard() {
  return (
    <View className="rounded-xl bg-gray-300">
      <TouchableOpacity className="m-3 mb-4 flex h-16 flex-row ">
        <View className=" mr-2 w-20 rounded-md bg-red-300"></View>
        <View className="">
          <Text className="text-lg font-extrabold">Chest</Text>
          <Text>asdf</Text>
        </View>
      </TouchableOpacity>
      <View className="justify-center rounded-t-lg bg-gray-500 px-3 py-4">
        <Text className="text-md font-medium">Set 1</Text>
        <View className="mt-1 flex-row gap-4">
          <View>
            <Text className="text-lg font-extrabold">Weight</Text>
            <TextInput
              keyboardType="numeric"
              className="h-8 rounded-lg bg-white"
            ></TextInput>
          </View>
          <View>
            <Text className="text-lg font-extrabold">Reps</Text>
            <TextInput
              keyboardType="numeric"
              className="h-8 rounded-lg bg-white"
            ></TextInput>
          </View>
        </View>
      </View>
      <View className="h-12 justify-center  bg-gray-400 px-3">
        <Text className="text-md font-extrabold">Set 2</Text>
      </View>
      <View className="h-12 justify-center rounded-b-lg bg-gray-500 px-3">
        <Text className="text-md font-extrabold">Set 1</Text>
      </View>
    </View>
  );
}

export default ExerciseCard;
