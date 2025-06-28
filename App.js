import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import MainStackScreen from "./navigation/MainStack";
import AuthStackScreen from "./navigation/AuthStack";
import useDeepLinkHandler from "./hooks/useDeepLinkHandler";
import { navigationRef } from "./navigation";
import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useDeepLinkHandler(setIsLoggedIn);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? <MainStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
