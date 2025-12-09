
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import StoryListScreen from "../screens/StoryListScreen";
import StoryDetailScreen from "../screens/StoryDetailScreen";
import CategoryScreen from "../screens/CategoryScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChapterDetailScreen from "../screens/ChapterDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: "Home Page" }} />
        <Stack.Screen name="StoryList" component={StoryListScreen} options={{ title: "Story List" }} />
        <Stack.Screen name="StoryDetail" component={StoryDetailScreen} options={{ title: "Story Detail" }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: "Category" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: "About Us" }} />
        <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} options={{ title: "Chapter Detail" }} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ title: "Favorite" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
