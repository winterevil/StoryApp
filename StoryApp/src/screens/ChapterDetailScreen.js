import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function ChapterDetailScreen({ route }) {
  const { chapter, storyTitle } = route.params;

  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Story Title */}
        <Text style={styles.storyName}>{storyTitle}</Text>

        {/* Chapter Title */}
        <Text style={styles.title}>{chapter.title}</Text>

        {/* Content */}
        <Text style={styles.content}>{chapter.content}</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },

  storyName: {
    fontSize: 20,          
    fontWeight: "700",
    color: "#184530",
    textAlign: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#184530",
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 28,
  },

  content: {
    fontSize: 15,
    lineHeight: 24,
    color: "#000",
    textAlign: "left",
  },
});

