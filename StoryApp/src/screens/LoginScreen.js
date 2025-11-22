import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { loginUser } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter all required fields");
    return;
  }

  const res = await loginUser(email, password);

  if (res.error) {
    alert(res.error);
    return;
  }

  // Lưu token vào AsyncStorage
  await AsyncStorage.setItem("token", res.token);
  await AsyncStorage.setItem("username", res.username);

  navigation.replace("Home");
};

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* TOP GRADIENT HEADER */}
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1", "#8FD9C4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topGradient}
      />

      {/* LOGIN CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subTitle}>
          Ready to continue your reading journey?{"\n"}
          <Text style={{ fontWeight: "600", color: "#184530" }}>
            Your path is right here.
          </Text>
        </Text>

        {/* Email input */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter email"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password input */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Remember me & forgot password */}
        {/* <View style={styles.rowBetween}>
          <View style={styles.row}>
            <View style={styles.checkbox} />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View> */}

        {/* LOGIN BUTTON */}
        <TouchableOpacity onPress={handleLogin} style={{ marginTop: 20 }}>
          <LinearGradient
        colors={['#8FD9C4', '#A1FFCE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* SIGN UP */}
        <Text style={styles.signUpText}>
          Don’t have an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topGradient: {
    height: "28%",
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  card: {
    marginTop: 0,
    paddingHorizontal: 26,
    paddingTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#184530",
    textAlign: "center",
  },

  subTitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 26,
  },

  inputWrapper: {
    width: "100%",
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: "#fff",
    color: "#184530",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.3,
    borderColor: "#999",
    marginRight: 6,
  },

  rememberText: {
    color: "#444",
    fontSize: 14,
  },

  forgotText: {
    color: "#184530",
    fontSize: 14,
    textDecorationLine: "underline",
  },

  loginBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },

  loginText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },

  signUpText: {
    textAlign: "center",
    marginTop: 26,
    fontSize: 14,
    color: "#555",
  },

  signUpLink: {
    color: "#184530",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
