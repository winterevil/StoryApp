import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AboutScreen() {
  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1, padding: 22 }}
    >
      <View style={styles.container}>

        {/* LOGO */}
        <Image 
          source={require("../assets/img/illustration.png")} 
          style={styles.logo} 
        />

        {/* NAME */}
        <Text style={styles.appName}>Tunova</Text>
        <Text style={styles.description}>A sleek and intuitive app for reading stories anytime, anywhere - completely free.</Text>

        {/* INFO CARD */}
        <View style={styles.card}>
          
          {/* Version */}
          <View style={styles.row}>
            <Icon name="tag-outline" size={22} color="#184530" />
            <Text style={styles.text}>Version 1.0.0</Text>
          </View>

          {/* Developer */}
          <View style={styles.row}>
            <Icon name="account-circle-outline" size={22} color="#184530" />
            <Text style={styles.text}>Developer: Tunova Studio</Text>
          </View>

          {/* Contact */}
          <View style={styles.row}>
            <Icon name="email-outline" size={22} color="#184530" />
            <Text style={styles.text}>support@tunova.app</Text>
          </View>

        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", justifyContent: "center" },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginBottom: 10,
  },

  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#184530",
  },

  description: {
    fontSize: 14,
    color: "#184530aa",
    marginBottom: 25,
    textAlign: "center",
  },

  card: {
    width: "92%",
    backgroundColor: "#ffffffdd",
    padding: 18,
    borderRadius: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  text: {
    fontSize: 15,
    color: "#184530",
    marginLeft: 10,
  },
});
