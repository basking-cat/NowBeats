import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import FeedScreen from "./screens/FeedScreen";
import CalendarScreen from "./screens/CalendarScreen";
import CallbackScreen from "./screens/CallbackScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Callback" component={CallbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
