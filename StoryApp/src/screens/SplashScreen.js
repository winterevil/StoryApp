import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.replace("Home"), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 StoryApp</Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#6a11cb", justifyContent: "center", alignItems: "center" },
  title: { color: "#fff", fontSize: 30, fontWeight: "bold", marginBottom: 20 },
});
