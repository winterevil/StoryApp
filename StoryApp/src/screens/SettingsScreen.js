import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chế độ tối</Text>
      <Switch value={darkMode} onValueChange={setDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", padding: 20 },
  label: { fontSize: 18 },
});
