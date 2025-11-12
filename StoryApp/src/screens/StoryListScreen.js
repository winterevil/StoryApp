import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import axios from "axios";

export default function StoryListScreen({ navigation }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("http://10.0.2.2:3000/api/stories").then((res) => setStories(res.data));
  }, []);

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("StoryDetail", { id: item.id })}>
          <Text style={{ fontSize: 18, margin: 10 }}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
