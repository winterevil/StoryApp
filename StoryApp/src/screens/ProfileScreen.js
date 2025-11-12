import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/200" }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text style={styles.name}>Người dùng Demo</Text>
      <Text>Email: demo@example.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
});
