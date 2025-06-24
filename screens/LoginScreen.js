import React from "react";
import { EXPO_API_HOST } from "@env";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
} from "react-native";
import axios from "axios";
const port = 50059;

//OSによってapi urlを変える。どちらにおいてもlocalhostはエミュレータ自身を指すので、ホストマシンに辿り着けない
function getApiUrl() {
  print("LoginScreen: EXPO_API_HOST", EXPO_API_HOST);
  if (Platform.OS === "android") {
    return `http://10.0.2.2:${port}`;
  }
  return `http://${EXPO_API_HOST}:${port}`;
}

export default function LoginScreen({ navigation, count, setCount }) {
  const handleLogin = async () => {
    const apiUrl = `${getApiUrl()}/login`;
    console.log("Attempting to connect to:", apiUrl);
    // console.log("API URL:", getApiUrl());

    try {
      const res = await fetch(apiUrl);
      const json = await res.json();

      console.log("Auth URL:", json.authUrl);
      console.log("Response status:", res.status);

      if (!json.authUrl) {
        console.error("Auth URL is undefined");
      } else {
        console.log("Auth URL:", json.authUrl);
        // ブラウザで認証URLを開く
        await Linking.openURL(json.authUrl);
      }
    } catch (err) {
      console.log("Login error:", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Spotifyでログイン</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#f4511e",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
