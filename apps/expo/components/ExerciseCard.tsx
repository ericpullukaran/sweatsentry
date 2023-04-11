import React, { useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { toggleAnimationExercise } from "~/utils/toggleAnimationExercise";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import { myResolveTWConfig } from "~/utils/myResolveTWConfig";
import AccordionItem from "./AccordionItem";
import { CheckBadgeIcon } from "react-native-heroicons/outline";

function ExerciseCard() {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: isActive ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimationExercise);
    setIsActive(!isActive);
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "0deg"],
  });

  return (
    <View>
      <AccordionItem
        isActive={isActive}
        setIsActive={setIsActive}
        header={
          <>
            <View className="mr-2 h-16 w-20 rounded-md bg-red-300"></View>
            <View className="flex-1">
              <Text className="text-base font-extrabold">Chest</Text>
              <Text className="text-xs"># Bench press</Text>
            </View>
            {!isActive && (
              <View className="mr-2">
                <Text>0/2</Text>
              </View>
            )}
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
