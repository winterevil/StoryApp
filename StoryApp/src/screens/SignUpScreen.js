import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { registerUser } from "../api/api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SignUpScreen({ navigation }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!fullname || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const res = await registerUser(fullname, email, password);

    if (res.error) {
      alert(res.error);
      return;
    }

    alert("Account created successfully!");
    navigation.replace("Login");
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

      {/* SIGNUP CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subTitle}>
          Start your reading journey with us!
        </Text>

        {/* Fullname */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#999"
            style={styles.input}
            value={fullname}
            onChangeText={setFullname}
          />

        </View>

        {/* Email */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry = {!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* SIGN UP BUTTON */}
        <TouchableOpacity onPress={handleSignUp} style={{ marginTop: 20 }}>
          <LinearGradient
            colors={["#8FD9C4", "#A1FFCE"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <Text style={styles.signUpText}>
          Already have an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate("Login")}
          >
            Sign In
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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 4,
    fontSize: 15,
    color: "#184530",
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
