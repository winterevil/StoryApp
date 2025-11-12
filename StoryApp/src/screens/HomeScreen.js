import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chào mừng đến StoryApp!</Text>

      <Button title="📚 Danh sách truyện" onPress={() => navigation.navigate("StoryList")} />
      <Button title="🔍 Tìm kiếm" onPress={() => navigation.navigate("Search")} />
      <Button title="📂 Thể loại" onPress={() => navigation.navigate("Category")} />
      <Button title="🔖 Truyện đã lưu" onPress={() => navigation.navigate("Bookmark")} />
      <Button title="⚙️ Cài đặt" onPress={() => navigation.navigate("Settings")} />
      <Button title="👤 Hồ sơ" onPress={() => navigation.navigate("Profile")} />
      <Button title="ℹ️ Giới thiệu" onPress={() => navigation.navigate("About")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
