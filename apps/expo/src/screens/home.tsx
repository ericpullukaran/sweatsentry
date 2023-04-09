import React from "react";
import { UserIcon } from "react-native-heroicons/solid";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";

import { trpc } from "../utils/trpc";

const SignOut = () => {
  const { signOut } = useAuth();
  return (
    <View className="border-gray-500 rounded-lg border-2 p-4">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

const PostCard: React.FC<{
  post:
    | inferProcedureOutput<AppRouter["post"]["all"]>[number]
    | { title: string; content: string };
}> = ({ post }) => {
  return (
    <View className="border-gray-500 rounded-lg border-2 p-4">
      <Text className="text-xl font-semibold text-[#FBBD23]">{post.title}</Text>
      <Text className="">{post.content}</Text>
    </View>
  );
};

const CreatePost: React.FC = () => {
  const utils = trpc.useContext();
  const { mutate } = trpc.post.create.useMutation({
    async onSuccess() {
      await utils.post.all.invalidate();
    },
  });

  const [title, onChangeTitle] = React.useState("");
  const [content, onChangeContent] = React.useState("");

  return (
    <View className="border-gray-500 flex flex-col border-t-2 p-4">
      <TextInput
        className="border-gray-500  mb-2 rounded border-2 p-2"
        onChangeText={onChangeTitle}
        placeholder="Title"
      />
      <TextInput
        className="border-gray-500  mb-2 rounded border-2 p-2"
        onChangeText={onChangeContent}
        placeholder="Content"
      />
      <TouchableOpacity
        className="rounded bg-[#cc66ff] p-2"
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text className=" font-semibold">Publish post</Text>
      </TouchableOpacity>
    </View>
  );
};

export const HomeScreen = () => {
  const userQuery = trpc.user.current.useQuery(); // XX FFFS THIS IS NOT WORKING
  const postQuery = trpc.post.all.useQuery();
  const exercisesQuery = trpc.exercises.all.useQuery();

  const [showPost, setShowPost] = React.useState<string | null>(null);

  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <View className="flex-row justify-end">
          <View className="flex-1">
            <Text className="pb-2 text-sm font-bold">Welcome...</Text>
            <Text className="text-5xl font-extrabold text-[#FBBD23]">
              {userQuery.data?.firstName || "loading..."}
            </Text>
          </View>
          <View>
            <TouchableOpacity className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#ededed]">
              <UserIcon color={"black"} width={40} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="py-2">
          {showPost ? (
            <Text className="">
              <Text className="font-semibold">Selected post:</Text>
              {showPost}
            </Text>
          ) : (
            <Text className=" font-semibold italic">Press on a post</Text>
          )}
        </View>

        <FlashList
          data={exercisesQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <TouchableOpacity onPress={() => setShowPost(p.item.id)}>
              <PostCard
                post={{ title: p.item.name, content: p.item.description || "" }}
              />
            </TouchableOpacity>
          )}
        />

        <CreatePost />
        <SignOut />
      </View>
    </SafeAreaView>
  );
};
