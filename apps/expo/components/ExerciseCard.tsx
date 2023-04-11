import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import AccordionItem from "./AccordionItem";

function ExerciseCard() {
  return (
    <View>
      <AccordionItem
        header={
          <>
            <View className="mr-2 h-16 w-20 rounded-md bg-red-300"></View>
            <View className="flex-1">
              <Text className="text-base font-extrabold">Chest</Text>
              <Text className="text-xs"># Bench press</Text>
            </View>
            <View className="mr-2">
              <Text>0/2</Text>
            </View>
          </>
        }
        body={
          <View className="justify-center rounded-lg ">
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
        }
        footer={
          <Pressable className="mt-3 items-center">
            <Text className="text-lg font-extrabold">Add Set</Text>
          </Pressable>
        }
      />
    </View>
  );
}

export default ExerciseCard;
