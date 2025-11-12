import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import StoryListScreen from "../screens/StoryListScreen";
import StoryDetailScreen from "../screens/StoryDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import CategoryScreen from "../screens/CategoryScreen";
import BookmarkScreen from "../screens/BookmarkScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
        <Stack.Screen name="StoryList" component={StoryListScreen} options={{ title: "Danh sách truyện" }} />
        <Stack.Screen name="StoryDetail" component={StoryDetailScreen} options={{ title: "Chi tiết truyện" }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: "Tìm kiếm" }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: "Thể loại" }} />
        <Stack.Screen name="Bookmark" component={BookmarkScreen} options={{ title: "Truyện đã lưu" }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Tài khoản" }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: "Giới thiệu" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
