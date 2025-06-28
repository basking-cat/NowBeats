import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import FeedScreen from "./screens/FeedScreen";
import CalendarScreen from "./screens/CalendarScreen";
import CallbackScreen from "./screens/CallbackScreen";
import { createNavigationContainerRef } from "@react-navigation/native";

// 現時点ではApp.js内でしか使っていないが、将来的に外部からの画面遷移で使う可能性があるためexport
export const navigationRef = createNavigationContainerRef();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("spotifyAccessToken");
      if (token) setIsLoggedIn(true);
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const handleUrl = async (e) => {
      url_parsed = new URL(e.url);

      // ログイン時遷移
      if (url_parsed.hostname == "callback") {
        const access_token = url_parsed.searchParams.get("access_token");
        const refresh_token = url_parsed.searchParams.get("refresh_token");
        await AsyncStorage.setItem("spotifyAccessToken", access_token);
        await AsyncStorage.setItem("spotifyRefreshToken", refresh_token);
      }
      navigationRef.navigate("Feed");
    };
    const subscription = Linking.addEventListener("url", handleUrl);

    return () => {
      subscription.remove();
    };
  });

  const AuthStack = createStackNavigator();
  function AuthStackScreen() {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Callback" component={CallbackScreen} />
      </AuthStack.Navigator>
    );
  }

  const MainStack = createStackNavigator();
  function MainStackScreen() {
    return (
      <MainStack.Navigator initialRouteName="Feed">
        <MainStack.Screen name="Calendar" component={CalendarScreen} />
        <MainStack.Screen name="Feed" component={FeedScreen} />
      </MainStack.Navigator>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? <MainStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
