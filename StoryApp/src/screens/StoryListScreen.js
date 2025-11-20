import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";

export default function StoryListScreen({ route, navigation }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryId = route?.params?.categoryId || null;
  const categoryName = route?.params?.categoryName || "Story List";

  useEffect(() => {
    const fetchStories = async () => {
      try {
        let url = "http://10.0.2.2:8080/api/stories";
        if (categoryId) {
          url = `http://10.0.2.2:8080/api/stories/category/${categoryId}`;
        }

        const res = await axios.get(url);
        setStories(res.data || []);
      } catch (error) {
        console.error("Error loading stories:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [categoryId]);

  // LOADING UI
  if (loading) {
    return (
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.center}
      >
        <ActivityIndicator size="large" color="#184530" />
        <Text style={styles.loadingText}>Loading stories...</Text>
      </LinearGradient>
    );
  }

  // EMPTY UI
  if (!stories || stories.length === 0) {
    return (
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.center}
      >
        <Text style={styles.emptyText}>No stories found in this category.</Text>
      </LinearGradient>
    );
  }

  // EACH STORY
  const renderStory = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("StoryDetail", { storyId: item.id })}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri:
            item.cover_image && item.cover_image.trim() !== ""
              ? item.cover_image
              : "https://i.imgur.com/V7ZB9bC.png",
        }}
        style={styles.cover}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.description || "No description available."}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.innerContainer}>
        <FlatList
          data={stories}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : index.toString()
          }
          renderItem={renderStory}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },

  header: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 22,
    color: "#184530",
    letterSpacing: 0.3,
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

  // ✨ MINIMAL LUXURY CARD
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffffcc",
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ffffff55", // border nhẹ kiểu luxury
  },

  cover: {
    width: 90,
    height: 125,
    borderRadius: 12,
  },

  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#184530",
    marginBottom: 4,
  },

  author: {
    fontSize: 14,
    color: "#18453099",
    marginBottom: 6,
  },

  desc: {
    fontSize: 13,
    color: "#184530aa",
    lineHeight: 18,
  },
});
