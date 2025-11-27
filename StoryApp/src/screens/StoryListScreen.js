import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fetchStories, fetchStoriesByCategory, addFavorite, removeFavorite, fetchFavorites } from "../api/api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StoryListScreen({ route, navigation }) {
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryId = route?.params?.categoryId || null;
  const categoryName = route?.params?.categoryName || null;
  const [userId, setUserId] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const filteredStories = stories.filter(item => {
    const search = removeVietnameseTones(searchText.toLowerCase());

    const title = removeVietnameseTones(item.title.toLowerCase());
    const author = removeVietnameseTones(item.author.toLowerCase());

    return title.includes(search) || author.includes(search);
  });


  useEffect(() => {
    const loadUserAndFavorites = async () => {
      const uid = await AsyncStorage.getItem("userId");
      setUserId(uid);

      if (uid) {
        const favList = await fetchFavorites(uid);
        const ids = favList.map(s => s.id);
        setFavoriteIds(ids);
      }
    };

    loadUserAndFavorites();
  }, []);

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        let data = [];

        if (categoryId) {
          data = await fetchStoriesByCategory(categoryId);
        } else {
          data = await fetchStories();
        }

        setStories(data || []);
      } catch (error) {
        console.error("Error loading stories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [categoryId]);

  // LOADING
  if (loading) {
    return (
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
        style={styles.center}
      >
        <ActivityIndicator size="large" color="#184530" />
        <Text style={styles.loadingText}>Loading stories...</Text>
      </LinearGradient>
    );
  }

  // EMPTY
  if (!stories || stories.length === 0) {
    return (
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
        style={styles.center}
      >
        <Text style={styles.emptyText}>No stories found.</Text>
      </LinearGradient>
    );
  }

  // EACH STORY ITEM
  const renderStory = ({ item }) => (
    <View style={styles.cardWrapper}>
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
                : "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg",
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

      <TouchableOpacity
        onPress={() => toggleFavorite(item.id)}
        style={styles.favoriteBtn}
      >
        <Icon
          name={favoriteIds.includes(item.id) ? "heart" : "heart-outline"}
          size={26}
          color={favoriteIds.includes(item.id) ? "#ff4d4d" : "#d14d4d"}
        />
      </TouchableOpacity>
    </View>
  );

  const toggleFavorite = async (storyId) => {
    if (!userId) return alert("Please login again!");

    const isFav = favoriteIds.includes(storyId);

    if (isFav) {
      // REMOVE
      const res = await removeFavorite(userId, storyId);
      setFavoriteIds(favoriteIds.filter(id => id !== storyId));
    } else {
      // ADD
      const res = await addFavorite(userId, storyId);
      setFavoriteIds([...favoriteIds, storyId]);
    }
  };

  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      style={{ flex: 1 }}
    >
      <View style={styles.innerContainer}>
        {categoryName && (
          <Text style={styles.categoryHeader}>{categoryName}</Text>
        )}
        <TextInput
          placeholder="Search by title or author..."
          placeholderTextColor="#18453099"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={filteredStories}
          keyExtractor={(item) => item.id.toString()}
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

  card: {
    flexDirection: "row",
    backgroundColor: "#ffffffcc",
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ffffff55",
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
  cardWrapper: {
    position: "relative",
  },

  favoriteBtn: {
    position: "absolute",
    top: 12,
    right: 15,
    backgroundColor: "#ffffffdd",
    padding: 6,
    borderRadius: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  categoryHeader: {
    fontSize: 26,
    fontWeight: "800",
    color: "#184530",
    textAlign: "center",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#ffffffdd",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ffffff55",
    color: "#184530",
  },
});
