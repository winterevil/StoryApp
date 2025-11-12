import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StoryApp 📖</Text>
      <Text style={styles.text}>
        Ứng dụng đọc truyện miễn phí, được phát triển bằng React Native + MySQL.
      </Text>
      <Text style={styles.text}>Phiên bản: 1.0.0</Text>
      <Text style={styles.text}>Tác giả: Bạn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 16, textAlign: "center", marginVertical: 5 },
});
