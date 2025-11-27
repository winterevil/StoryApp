import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* LOGO */}
        <Image source={require("../assets/img/illustration.png")} style={styles.logo} />
        {/* HEADER */}
        <Text style={styles.title}>Welcome to Tunova</Text>
        <Text style={styles.subTitle}>
          Your reading story friend
        </Text>

        {/* BUTTON LIST */}
        <View style={styles.menuWrapper}>
          <MenuButton
            label="Story List"
            icon="book-open-page-variant"
            onPress={() => navigation.navigate("StoryList")}
          />
          <MenuButton
            label="Category"
            icon="grid"
            onPress={() => navigation.navigate("Category")}
          />
          <MenuButton
            label="Favorite"
            icon="heart"
            onPress={() => navigation.navigate("Favorite")}
          />
          <MenuButton
            label="Profile"
            icon="account-circle"
            onPress={() => navigation.navigate("Profile")}
          />
          <MenuButton
            label="About Us"
            icon="information-outline"
            onPress={() => navigation.navigate("About")}
          />
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

/* CUSTOM BUTTON COMPONENT */
function MenuButton({ label, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.row}>
        <Icon name={icon} size={26} color="#184530" style={{ marginRight: 15 }} />
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 22,
    paddingTop: 70,
    paddingBottom: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 18,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#184530",
    marginBottom: 8,
  },

  subTitle: {
    fontSize: 16,
    color: "#184530aa",
    marginBottom: 35,
  },

  menuWrapper: {
    width: "100%",
  },

  button: {
    backgroundColor: "#ffffffcc",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 18,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    color: "#184530",
    fontWeight: "600",
    textAlign: "center",
  },
});
