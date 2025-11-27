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
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  fetchStoryById,
  fetchChapters,
  addFavorite,
  removeFavorite,
  fetchFavorites
} from "../api/api";

export default function StoryDetailScreen({ route, navigation }) {
  const { storyId } = route.params;

  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const uid = await AsyncStorage.getItem("userId");
        setUserId(uid);

        // FETCH STORY BY ID
        const storyJson = await fetchStoryById(storyId);
        setStory(storyJson);

        // FETCH CHAPTERS
        const chapterJson = await fetchChapters(storyId);
        setChapters(chapterJson || []);

        // CHECK FAVORITE
        if (uid) {
          const favList = await fetchFavorites(uid);
          const exists = favList.some((s) => s.id === storyId);
          setIsFavorite(exists);
        }

      } catch (err) {
        console.error("Error loading story details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [storyId]);

  const toggleFavorite = async () => {
    if (!userId) return alert("Please login again!");

    if (isFavorite) {
      await removeFavorite(userId, storyId);
      setIsFavorite(false);
      alert("Removed from favorites");
    } else {
      await addFavorite(userId, storyId);
      setIsFavorite(true);
      alert("Added to favorites!");
    }
  };

  if (loading || !story) {
    return (
      <LinearGradient colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]} style={styles.center}>
        <ActivityIndicator size="large" color="#184530" />
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.coverWrapper}>
          <Image
            source={{
              uri: story.cover_image || "https://placehold.co/300x400"
            }}
            style={styles.cover}
          />
        </View>

        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.author}>by {story.author}</Text>
        <Text style={styles.category}>
          Category: {story?.category?.name || "Unknown"}
        </Text>

        <TouchableOpacity style={styles.favoriteBtn} onPress={toggleFavorite}>
          <Icon
            name={isFavorite ? "heart" : "heart-outline"}
            size={30}
            color={isFavorite ? "#e63946" : "#184530"}
          />
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Description</Text>
        <Text style={styles.desc}>{story.description}</Text>

        <Text style={styles.sectionHeader}>Chapters</Text>
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
              <Icon name="book-open-page-variant" size={22} color="#184530" />
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
    paddingBottom: 60,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#184530",
  },
  emptyText: {
    fontSize: 16,
    color: "#184530",
  },

  coverWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  cover: {
    width: 220,
    height: 300,
    borderRadius: 18,
    elevation: 6,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#184530",
    textAlign: "center",
  },
  author: {
    textAlign: "center",
    fontSize: 15,
    color: "#18453099",
  },
  category: {
    textAlign: "center",
    marginBottom: 18,
    color: "#18453099",
  },

  sectionHeader: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#184530",
  },

  desc: {
    fontSize: 16,
    lineHeight: 22,
    color: "#184530dd",
  },

  favoriteBtn: {
    position: "absolute",
    top: 40,
    right: 25,
    padding: 8,
    backgroundColor: "#ffffffcc",
    borderRadius: 40,
    elevation: 4,
  },

  chapterCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#ffffffcc",
    borderRadius: 12,
    borderColor: "#ffffff55",
    borderWidth: 1,
    gap: 12,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#184530",
  },
});
