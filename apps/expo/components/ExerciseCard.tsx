import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function ExerciseCard() {
  return (
    <View className="rounded-xl bg-orange-300">
      <TouchableOpacity className="z-40 flex flex-row rounded-lg bg-slate-400 p-3">
        <View className=" mr-2 w-20 rounded-md bg-red-300"></View>
        <View className="">
          <Text className="text-lg font-extrabold">Chest</Text>
          <Text>asdf</Text>
        </View>
      </TouchableOpacity>
      <View className="-top-4 justify-center rounded-lg bg-base-100 px-3 py-4 pt-7">
        <Text className="text-md font-medium">Set 1</Text>
        <View className="mt-1 flex-row gap-4">
          <View>
            <Text className="text-lg font-extrabold">Weight</Text>
            <TextInput
              keyboardType="numeric"
              className="h-8 rounded-lg border-2 border-black/70"
            ></TextInput>
          </View>
          <View>
            <Text className="text-lg font-extrabold">Reps</Text>
            <TextInput
              keyboardType="numeric"
              className="h-8 rounded-lg border-2 border-black/70"
            ></TextInput>
          </View>
        </View>
      </View>
      <View className="items-center pb-3">
        <Text className="text-lg font-extrabold">Add Set</Text>
      </View>
    </View>
  );
}

export default ExerciseCard;
