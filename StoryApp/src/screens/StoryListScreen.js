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

export default function StoryListScreen({ route, navigation }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryId = route?.params?.categoryId || null;
  const categoryName = route?.params?.categoryName || "Tất cả truyện";

  useEffect(() => {
    const fetchStories = async () => {
      try {
        let url = "http://10.0.2.2:8080/api/stories";
        if (categoryId) {
          // 🟢 Nếu có categoryId (được truyền từ CategoryScreen)
          url = `http://10.0.2.2:8080/api/stories/category/${categoryId}`;
        }

        console.log("📡 Gọi API:", url);
        const res = await axios.get(url);
        console.log("📚 Dữ liệu truyện:", res.data);

        setStories(res.data || []);
      } catch (error) {
        console.error("❌ Lỗi khi tải danh sách truyện:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [categoryId]);

  // ⏳ Màn hình chờ khi tải dữ liệu
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00aaff" />
        <Text>Đang tải danh sách truyện...</Text>
      </View>
    );
  }

  // ⚠️ Trường hợp không có truyện nào
  if (!stories || stories.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Chưa có truyện trong thể loại này.
        </Text>
      </View>
    );
  }

  // 📖 Render từng truyện
  const renderStory = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("StoryDetail", { storyId: item.id })}
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
        <Text style={styles.author}>Tác giả: {item.author}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.description || "Chưa có mô tả."}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 {categoryName}</Text>
      <FlatList
        data={stories}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        renderItem={renderStory}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#0077cc",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cover: { width: 80, height: 100, borderRadius: 6 },
  info: { flex: 1, marginLeft: 10, justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", color: "#222" },
  author: { fontSize: 14, color: "#666", marginTop: 4 },
  desc: { fontSize: 13, color: "#777", marginTop: 6 },
});
