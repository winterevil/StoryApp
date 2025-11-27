import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { fetchUserById, updateUser } from "../api/api";

export default function ProfileScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loadUserData = async () => {
    const id = await AsyncStorage.getItem("userId");
    if (!id) return;

    setUserId(id);
    const data = await fetchUserById(id);

    setUser(data);
    setFullName(data.full_name);
    setEmail(data.email);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (!user) return <Text>Loading...</Text>;

  const avatarChar = fullName.charAt(0).toUpperCase();

  const handleUpdate = async () => {
    let body = {
      full_name: fullName,
      email,
      username: email,
    };

    if (oldPassword || newPassword || confirmPassword) {

      if (!oldPassword || !newPassword || !confirmPassword) {
        Alert.alert("Error", "Please fill all password fields.");
        return;
      }

      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New passwords do not match.");
        return;
      }

      body.old_password = oldPassword;
      body.new_password = newPassword;
    }

    const res = await updateUser(userId, body);

    if (res.error) {
      Alert.alert("Error", res.error);
      return;
    }

    if (res.logout) {
      Alert.alert("Password changed", "Please login again.");
      await AsyncStorage.clear();
      navigation.replace("Login");
      return;
    }

    Alert.alert("Success", "Profile updated successfully.");
    loadUserData();
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login");
  };

  return (
    <LinearGradient
      colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
      style={{ flex: 1, paddingTop: 80, alignItems: "center" }}
    >
      <View style={styles.card}>

        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{avatarChar}</Text>
        </View>

        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Old Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={styles.rowButtons}>
          <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn}>
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#ffffffdd",
    padding: 25,
    borderRadius: 22,
    alignItems: "center",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#184530",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  avatarText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#fff",
  },

  label: {
    alignSelf: "flex-start",
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#184530",
  },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  rowButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
  },

  updateBtn: {
    backgroundColor: "#184530",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
  },

  logoutBtn: {
    backgroundColor: "#b30000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
  },

  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

});
