import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import axios from "axios";

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // 🟢 Lấy danh sách thể loại từ Spring Boot backend
        const res = await axios.get("http://10.0.2.2:8080/api/categories");
        setCategories(res.data || []);
      } catch (error) {
        console.error("❌ Lỗi khi tải thể loại:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00aaff" />
        <Text>Đang tải thể loại truyện...</Text>
      </View>
    );
  }

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.category}
      onPress={() =>
        navigation.navigate("StoryList", { categoryId: item.id, categoryName: item.name })
      }
    >
      <Text style={styles.text}>📖 {item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Danh mục thể loại</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategory}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#0077cc",
  },
  category: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: { fontSize: 18, fontWeight: "600", color: "#222" },
  desc: { fontSize: 14, color: "#555", marginTop: 4 },
});
