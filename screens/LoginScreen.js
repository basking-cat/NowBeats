import React from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
} from "react-native";
import axios from "axios";
const port = 8082;

//OSによってapi urlを変える。どちらにおいてもlocalhostはエミュレータ自身を指すので、ホストマシンに辿り着けない
function getApiUrl() {
  if (Platform.OS === "android") {
    return `http://10.0.2.2:${port}`;
  }
  return `http://192.168.11.27:${port}`; //本当はipをpackage.jsonとかに書いてそれを参照した方がいいのかなぁ
}

export default function LoginScreen({ navigation, count, setCount }) {
  const handleLogin = async () => {
    try {
      const apiUrl = `${getApiUrl()}/login`;
      console.log("Attempting to connect to:", apiUrl);
      const response = await axios.get(apiUrl);
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Response data:", response.data);
      console.log("Full response:", JSON.stringify(response, null, 2));

      if (!response.data.authUrl) {
        console.error("Auth URL is undefined");
      } else {
        console.log("Auth URL:", response.data.authUrl);
        // ブラウザで認証URLを開く
        await Linking.openURL(response.data.authUrl);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
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
