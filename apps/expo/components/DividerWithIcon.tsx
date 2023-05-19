import React, { ReactNode } from "react";
import { View } from "react-native";

interface DividerWithIconProps {
  children: ReactNode;
  className?: string;
}

function DividerWithIcon(props: DividerWithIconProps) {
  const { children, className } = props;
  return (
    <View
      className={`mx-auto mb-4 mt-4 w-[75%] flex-row items-center ${className}`}
    >
      <View className="h-[1px] flex-1 bg-white" />
      <View className="mx-3">{children}</View>
      <View className="h-[1px] flex-1 bg-white" />
    </View>
  );
}

export default DividerWithIcon;
