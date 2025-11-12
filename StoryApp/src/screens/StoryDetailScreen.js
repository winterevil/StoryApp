import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";

export default function StoryDetailScreen({ route }) {
  const { id } = route.params;
  const [story, setStory] = useState(null);

  useEffect(() => {
    axios.get(`http://10.0.2.2:3000/api/stories/${id}`).then((res) => setStory(res.data));
  }, []);

  if (!story) return <Text>Loading...</Text>;

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{story.title}</Text>
      <Text style={{ fontStyle: "italic" }}>Tác giả: {story.author}</Text>
      <Text style={{ marginTop: 10 }}>{story.content}</Text>
    </ScrollView>
  );
}
