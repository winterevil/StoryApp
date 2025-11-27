<<<<<<< HEAD
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import StoryListScreen from '../screens/StoryListScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import CategoryScreen from '../screens/CategoryScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
=======
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import StoryListScreen from "../screens/StoryListScreen";
import StoryDetailScreen from "../screens/StoryDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import CategoryScreen from "../screens/CategoryScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChapterDetailScreen from "../screens/ChapterDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
>>>>>>> afb9c3f8779c07ab6f05b99f7116e51f6a63e36d

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoryList"
          component={StoryListScreen}
          options={{ title: 'Danh sách truyện' }}
        />
        <Stack.Screen
          name="StoryDetail"
          component={StoryDetailScreen}
          options={{ title: 'Chi tiết truyện' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Tìm kiếm' }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{ title: 'Thể loại' }}
        />
        <Stack.Screen
          name="Bookmark"
          component={BookmarkScreen}
          options={{ title: 'Truyện đã lưu' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Cài đặt' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Tài khoản' }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'Giới thiệu' }}
        />
=======
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: "Home Page" }} />
        <Stack.Screen name="StoryList" component={StoryListScreen} options={{ title: "Story List" }} />
        <Stack.Screen name="StoryDetail" component={StoryDetailScreen} options={{ title: "Story Detail" }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: "Search" }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: "Category" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: "About Us" }} />
        <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} options={{ title: "Chapter Detail" }} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ title: "Favorite" }} />
>>>>>>> afb9c3f8779c07ab6f05b99f7116e51f6a63e36d
      </Stack.Navigator>
    </NavigationContainer>
  );
}
