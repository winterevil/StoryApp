import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";

export default function StoryDetailScreen({ route, navigation }) {
  const { storyId } = route.params;
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        console.error("Lỗi khi tải truyện:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storyId]);

  if (loading) {
    return (
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.center}
      >
        <ActivityIndicator size="large" color="#184530" />
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    );
  }

  if (!story) {
    return (
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.center}
      >
        <Text style={styles.emptyText}>No story available.</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cover */}
        {story.cover_image && (
          <View style={styles.coverWrapper}>
            <Image
              source={{ uri: story.cover_image }}
              style={styles.cover}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Title */}
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.author}>by {story.author}</Text>

        {/* Description */}
        <Text style={styles.desc}>{story.description}</Text>

        {/* Chapters */}
        <Text style={styles.header}>Chapters</Text>

        {chapters.length > 0 ? (
          chapters.map((ch) => (
            <TouchableOpacity
              key={ch.id}
              style={styles.chapterCard}
              onPress={() =>
                navigation.navigate("ChapterDetail", {
                  chapter: ch,
                  storyTitle: story.title,
                })
              }
            >
              <Text style={styles.chapterTitle}>{ch.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.empty}>No chapters available.</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: "#184530",
  },

  emptyText: {
    fontSize: 16,
    color: "#184530",
  },

  coverWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 26,
  },

  cover: {
    width: 200,
    height: 280,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#184530",
    marginBottom: 6,
    textAlign: "center",
  },

  author: {
    fontSize: 15,
    color: "#18453099",
    marginBottom: 18,
    textAlign: "center",
  },

  desc: {
    fontSize: 15,
    color: "#184530dd",
    lineHeight: 22,
    marginBottom: 30,
  },

  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#184530",
    marginBottom: 14,
  },

  chapterCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#ffffffcc",
    borderWidth: 1,
    borderColor: "#ffffff55",
    marginBottom: 14,
  },

  chapterTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#184530",
  },
});
