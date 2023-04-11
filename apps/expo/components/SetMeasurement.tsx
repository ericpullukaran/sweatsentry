import React, { ReactElement } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { ArchiveBoxXMarkIcon } from "react-native-heroicons/solid";
import { XCircleIcon } from "react-native-heroicons/solid";
import { myResolveTWConfig } from "~/utils/myResolveTWConfig";

interface SetMeasurementProps {
  num: number;
  removeSet: (num: number) => void;
}

function SetMeasurement({ num, removeSet }: SetMeasurementProps) {
  return (
    <View className="mb-4 justify-center rounded-lg">
      <Text className="text-md mb-1 font-medium">Set {num + 1}</Text>
      <View className="flex-row items-center">
        <View className="mt-1 flex-1 flex-row  gap-4">
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
        <Pressable onPress={() => removeSet(num)} className="mt-3 items-center">
          <ArchiveBoxXMarkIcon
            height={30}
            width={30}
            color={myResolveTWConfig("error")}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default SetMeasurement;
