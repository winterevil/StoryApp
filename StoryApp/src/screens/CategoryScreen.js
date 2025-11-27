import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchCategories } from "../api/api";

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const fetched = await fetchCategories();
      const icons = [
        "book-open-page-variant",
        "book-heart-outline",
        "sword-cross",
        "ghost",
        "drama-masks",
        "star-face",
        "wizard-hat",
        "alien-outline",
        "robot-outline",
        "detective",
        "emoticon-happy-outline",
        "earth",
        "map-search-outline",
        "sword",
        "yin-yang",
        "shield-halved-outline",
        "virus-outline",
        "clock-time-nine-outline",
        "crown-outline",
        "school-outline",
      ];

      // Random icon cho mỗi category
      const shuffled = [...icons];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const updated = fetched.map((cat, index) => ({
        ...cat,
        randomIcon: shuffled[index % shuffled.length],
      }));

      setCategories(updated);
    } catch (error) {
      console.error("Lỗi tải thể loại:", error);
    } finally {
      setLoading(false);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
        style={styles.center}
      >
        <ActivityIndicator size="large" color="#184530" />
        <Text style={{ marginTop: 8, color: "#184530" }}>Loading...</Text>
      </LinearGradient>
    );
  }

  // Render từng category
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("StoryList", {
          categoryId: item.id,
          categoryName: item.name,
        })
      }
    >
      <LinearGradient colors={["#ffffffee", "#f7fffdee"]} style={styles.cardInner}>
        <LinearGradient colors={["#A1FFCE", "#8FD9C4"]} style={styles.iconCircle}>
          <Icon name={item.randomIcon} size={28} color="#fff" />
        </LinearGradient>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          {item.description ? (
            <Text style={styles.desc} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]} style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    marginBottom: 16,
    borderRadius: 22,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 5,
  },

  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 22,
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#184530",
  },

  desc: {
    fontSize: 14,
    marginTop: 4,
    color: "#184530aa",
    lineHeight: 20,
  },
});
