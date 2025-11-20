// import React from "react";
// import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

// export default function HomeScreen({ navigation }) {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Chào mừng đến StoryApp!</Text>

//       <Button title="📚 Danh sách truyện" onPress={() => navigation.navigate("StoryList")} />
//       <Button title="🔍 Tìm kiếm" onPress={() => navigation.navigate("Search")} />
//       <Button title="📂 Thể loại" onPress={() => navigation.navigate("Category")} />
//       <Button title="🔖 Truyện đã lưu" onPress={() => navigation.navigate("Bookmark")} />
//       <Button title="⚙️ Cài đặt" onPress={() => navigation.navigate("Settings")} />
//       <Button title="👤 Hồ sơ" onPress={() => navigation.navigate("Profile")} />
//       <Button title="ℹ️ Giới thiệu" onPress={() => navigation.navigate("About")} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
// });

import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <Text style={styles.title}>Welcome to Tunova 📚</Text>
        <Text style={styles.subTitle}>
          Your reading story friend ✨
        </Text>

        {/* BUTTON LIST */}
        <View style={styles.menuWrapper}>
          <MenuButton
            label="📚 Danh sách truyện"
            onPress={() => navigation.navigate("StoryList")}
          />
          <MenuButton
            label="🔍 Tìm kiếm"
            onPress={() => navigation.navigate("Search")}
          />
          <MenuButton
            label="📂 Thể loại"
            onPress={() => navigation.navigate("Category")}
          />
          <MenuButton
            label="🔖 Truyện đã lưu"
            onPress={() => navigation.navigate("Bookmark")}
          />
          <MenuButton
            label="⚙️ Cài đặt"
            onPress={() => navigation.navigate("Settings")}
          />
          <MenuButton
            label="👤 Hồ sơ"
            onPress={() => navigation.navigate("Profile")}
          />
          <MenuButton
            label="ℹ️ Giới thiệu"
            onPress={() => navigation.navigate("About")}
          />
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

/* CUSTOM BUTTON COMPONENT */
function MenuButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingTop: 70,
    paddingBottom: 120,
    alignItems: "center",
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

    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  buttonText: {
    fontSize: 17,
    color: "#184530",
    fontWeight: "600",
    textAlign: "center",
  },
});
