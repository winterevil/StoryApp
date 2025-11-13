import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";

export default function StoryDetailScreen({ route }) {
  const { storyId } = route.params;
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("📘 Đang xem chi tiết truyện ID:", storyId);
    const fetchData = async () => {
      try {
        const storyRes = await axios.get(
          `http://10.0.2.2:8080/api/stories/${storyId}`
        );
        const chapterRes = await axios.get(
          `http://10.0.2.2:8080/api/chapters/story/${storyId}`
        );
        setStory(storyRes.data);
        setChapters(chapterRes.data || []);
      } catch (error) {
        console.error("❌ Lỗi khi tải truyện:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [storyId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00aaff" />
        <Text>Đang tải truyện...</Text>
      </View>
    );
  }

  if (!story) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy truyện.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {story.cover_image && (
        <Image
          source={{ uri: story.cover_image }}
          style={styles.cover}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.author}>Tác giả: {story.author}</Text>
      <Text style={styles.desc}>{story.description}</Text>

      <Text style={styles.header}>📖 Nội dung các chương</Text>
      {chapters.length > 0 ? (
        chapters.map((ch) => (
          <View key={ch.id} style={styles.chapter}>
            <Text style={styles.chapterTitle}>{ch.title}</Text>
            <Text style={styles.chapterContent}>{ch.content}</Text>
          </View>
        ))
      ) : (
        <Text>Truyện này chưa có chương nào.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 4, color: "#111" },
  author: { fontSize: 16, fontStyle: "italic", color: "#555", marginBottom: 10 },
  desc: { fontSize: 15, lineHeight: 22, color: "#333", marginBottom: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  chapter: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  chapterTitle: { fontWeight: "600", fontSize: 16, color: "#333" },
  chapterContent: { marginTop: 4, fontSize: 14, color: "#555", lineHeight: 20 },
});
