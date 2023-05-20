import { View, Text } from "react-native";
import React from "react";

type Props = {};

const HistoryCard = (props: Props) => {
  return (
    <View className="h-20 flex-row items-center rounded-lg bg-base-200 p-2">
      <View className="">
        <Text>26th May</Text>
      </View>
      <View className="mr-2 h-16 w-16 bg-slate-500"></View>
      <View className="self-start">
        <Text className="text-lg font-medium text-white">HistoryCard</Text>
      </View>
    </View>
  );
};

export default HistoryCard;
