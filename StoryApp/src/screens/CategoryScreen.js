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
import axios from "axios";

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://10.0.2.2:8080/api/categories");
        const fetched = res.data || [];

        const icons = [
          "book-open-page-variant",   // truyện nói chung
          "book-heart-outline",       // ngôn tình / lãng mạn
          "sword-cross",              // hành động / chiến đấu
          "ghost",                    // kinh dị / ma
          "drama-masks",              // tâm lý / kịch tính
          "star-face",                // huyền ảo / fantasy
          "wizard-hat",               // phép thuật / wizard
          "alien-outline",            // khoa học viễn tưởng
          "robot-outline",            // công nghệ / sci-fi
          "detective",                // trinh thám / điều tra
          "emoticon-happy-outline",   // hài hước
          "earth",                    // phiêu lưu / khám phá
          "map-search-outline",       // thám hiểm
          "sword",                    // kiếm hiệp
          "yin-yang",                 // võ thuật / tu tiên
          "shield-halved-outline",    // anh hùng / bảo vệ
          "virus-outline",            // zombie / apocalypse
          "clock-time-nine-outline",  // xuyên không
          "crown-outline",            // cung đấu / hoàng gia
          "school-outline",           // học đường
        ];

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
        console.error("Lỗi tải thể loại:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
        style={styles.center}
      >
        <ActivityIndicator size="large" color="#184530" />
        <Text style={{ marginTop: 10, color: "#184530" }}>Loading...</Text>
      </LinearGradient>
    );
  }

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
      <LinearGradient
        colors={["#ffffffee", "#f7fffdee"]}
        style={styles.cardInner}
      >
        {/* ICON CIRCLE */}
        <LinearGradient
          colors={["#A1FFCE", "#8FD9C4"]}
          style={styles.iconCircle}
        >
          <Icon name={item.randomIcon} size={28} color="#fff" />
        </LinearGradient>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          {item.description ? (
            <Text style={styles.desc}>{item.description}</Text>
          ) : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      style={styles.container}
    >
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
