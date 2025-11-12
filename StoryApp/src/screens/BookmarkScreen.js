import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function BookmarkScreen({ navigation }) {
  const [bookmarks] = useState([
    { id: 1, title: "Truyện yêu thích 1" },
    { id: 2, title: "Truyện yêu thích 2" },
  ]);

  return (
    <FlatList
      data={bookmarks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("StoryDetail", { id: item.id })}>
          <Text style={{ fontSize: 18, margin: 10 }}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
