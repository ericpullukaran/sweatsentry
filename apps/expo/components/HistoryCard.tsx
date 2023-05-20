import { View, Text } from "react-native";
import React from "react";

type Props = {
  classNames?: string;
};

const HistoryCard = ({ classNames }: Props) => {
  return (
    <View
      className={`${classNames} h-24 flex-row items-center rounded-lg border border-slate-500/5 bg-base-200 p-2`}
    >
      <View className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-white/80 p-1">
        <Text className="px-1 text-xs font-bold text-black">26th May</Text>
      </View>
      <View className="mr-2 h-full w-16 rounded-lg bg-slate-500"></View>
      <View className="h-full flex-1 self-start">
        <Text className="mb-1 text-xl font-bold text-white">History Card</Text>
        <View className="flex-row flex-wrap gap-1">
          <View className="w-fit rounded-lg border border-white/5 bg-white/5">
            <Text className="px-1 py-0.5 text-white/60">Chest</Text>
          </View>
          <View className="w-fit rounded-lg border border-white/5 bg-white/5">
            <Text className="px-1 py-0.5 text-white/60">Back</Text>
          </View>
          <View className="w-fit rounded-lg border border-white/5 bg-white/5">
            <Text className="px-1 py-0.5 text-white/60">Lat pull ...</Text>
          </View>
          <View className="w-fit rounded-lg border border-white/5 bg-white/5">
            <Text className="px-1 py-0.5 text-white/60">goblin s..</Text>
          </View>
          <View className="w-fit rounded-lg border border-white/5 bg-white/5">
            <Text className="px-1 py-0.5 text-white/60">Dumbell ro..</Text>
          </View>
          <View className="w-fit rounded-lg border border-dashed border-white/10">
            <Text className="px-2 py-0.5 text-white/20">More</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HistoryCard;
