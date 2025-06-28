import { useEffect } from "react";
import { navigationRef } from "../navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";

export default function useDeepLinkHandler(setIsLoggedIn) {
  useEffect(() => {
    const handleUrl = async (e) => {
      const url_parsed = new URL(e.url);

      // ログイン時遷移
      if (url_parsed.hostname == "callback") {
        const access_token = url_parsed.searchParams.get("access_token");
        const refresh_token = url_parsed.searchParams.get("refresh_token");
        await AsyncStorage.setItem("spotifyAccessToken", access_token);
        await AsyncStorage.setItem("spotifyRefreshToken", refresh_token);
        setIsLoggedIn(true);
      }
    };
    const subscription = Linking.addEventListener("url", handleUrl);

    return () => {
      subscription.remove();
    };
  });
}
