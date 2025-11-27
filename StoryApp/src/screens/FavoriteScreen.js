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
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFavorites } from "../api/api";

export default function FavoriteScreen({ navigation }) {
  const [favoriteStories, setFavoriteStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserAndFavorites = async () => {
      const uid = await AsyncStorage.getItem("userId");
      if (!uid) {
        alert("User not found. Please login again.");
        navigation.replace("Login");
        return;
      }

      setUserId(uid);

      const res = await fetchFavorites(uid);

      setFavoriteStories(res);
      setLoading(false);
    };

    loadUserAndFavorites();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]} style={styles.center}>
        <ActivityIndicator size="large" color="#184530" />
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </LinearGradient>
    );
  }

  if (favoriteStories.length === 0) {
    return (
      <LinearGradient colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]} style={styles.center}>
        <Text style={styles.emptyText}>You don't have any favorite stories yet.</Text>
      </LinearGradient>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("StoryDetail", { storyId: item.id })}
    >
      <Image
        source={{
          uri:
            item.cover_image?.trim() !== ""
              ? item.cover_image
              : "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg",
        }}
        style={styles.cover}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
        <Text numberOfLines={2} style={styles.desc}>
          {item.description || "No description available."}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]} style={{ flex: 1 }}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>My Favorites</Text>

        <FlatList
          data={favoriteStories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
    color: "#184530",
    textAlign: "center",
    marginBottom: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#184530",
  },

  emptyText: {
    fontSize: 17,
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
});
