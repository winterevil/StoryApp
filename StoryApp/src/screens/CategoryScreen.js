import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const categories = ["Ngôn tình", "Tiên hiệp", "Hài hước", "Kinh dị", "Hành động"];

export default function CategoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {categories.map((cat, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.category}
          onPress={() => navigation.navigate("StoryList", { category: cat })}
        >
          <Text style={styles.text}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  category: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  text: { fontSize: 18 },
});
