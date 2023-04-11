import React, { ReactNode, useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { toggleAnimationExercise } from "~/utils/toggleAnimationExercise";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import { myResolveTWConfig } from "~/utils/myResolveTWConfig";

interface AccordionItemProps {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;

  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function AccordionItem({
  header,
  body,
  footer,
  isActive,
  setIsActive,
}: AccordionItemProps) {
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    const config = {
      duration: 200,
      easing: Easing.out(Easing.ease),
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
    <View className="overflow-hidden rounded-xl bg-red-500">
      <Pressable
        onPress={() => toggleListItem()}
        className="z-40 flex-row items-center rounded-lg bg-slate-200 p-3"
      >
        {header}
        <Animated.View
          className="items-center justify-center"
          style={{ transform: [{ rotateZ: arrowTransform }] }}
        >
          <ChevronDownIcon
            className=""
            color={myResolveTWConfig("primary-content")}
          />
        </Animated.View>
      </Pressable>

      {isActive && (
        <View className="-top-4">
          <View className="bg-success px-4 pb-6 pt-8">{body}</View>
          {footer}
        </View>
      )}
    </View>
  );
}

export default AccordionItem;
