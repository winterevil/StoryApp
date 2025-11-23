import React, { useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function SplashScreen({ navigation }) {
  // Auto chuyển
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("Login"), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* HEADER TEXT */}
      <View style={styles.topTextBox}>
        <Text style={styles.title}>Welcome To</Text>
        <Text style={styles.subTitle}>Tunova Reading App</Text>
      </View>

      {/* MAIN ILLUSTRATION */}
      <Image
        source={require("../assets/img/illustration.png")}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* FOOTER AREA */}
      <View style={styles.bottomArea}>
        <Text style={styles.description}>
          Your reading companion is here to inspire{"\n"}
          and guide you through endless stories.
        </Text>

        {/* LET'S START BUTTON */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.startText}>Let's Start →</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    alignItems: "center",
  },

  topTextBox: {
    marginTop: 75,
    alignItems: "flex-start",
    width: "100%",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#184530",
  },

  subTitle: {
    fontSize: 18,
    marginTop: 2,
    fontWeight: "600",
    color: "#184530cc",
  },

  illustration: {
    width: "90%",
    height: 280,
    marginTop: 40,
  },

  bottomArea: {
    alignItems: "center",
    marginTop: 40,
  },

  description: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    color: "#184530cc",
    marginBottom: 30,
  },

  startButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },

  startText: {
    fontSize: 16,
    color: "#184530",
    fontWeight: "700",
  },
});
