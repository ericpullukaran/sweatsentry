import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import AccordionItem from "./AccordionItem";
import SetMeasurement from "./SetMeasurement";
const EMPTY_SET = { weights: 0, num_reps: 0 };
function ExerciseCard() {
  const [sets, setSets] = useState([EMPTY_SET]);
  const removeSet = (indexToRemove: number) => {
    console.log(sets, indexToRemove);

    setSets(sets.filter((_, index) => index !== indexToRemove));
  };
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
          <>
            <FlatList
              scrollEnabled={false}
              data={sets}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <SetMeasurement key={index} num={index} removeSet={removeSet} />
              )}
            />
          </>
        }
        footer={
          <Pressable
            onPress={() => setSets([...sets, EMPTY_SET])}
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
