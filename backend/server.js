const express = require("express");
const axios = require("axios");
const app = express();
const port = 8082;
require("dotenv").config();
const cliendId = process.env.EXPO_PUBLIC_CLIENT_ID;
const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET;
// デバッグログを追加
console.log("環境変数の確認:");
console.log("CLIENT_ID:", cliendId);
console.log("CLIENT_SECRET:", clientSecret);
console.log("現在の作業ディレクトリ:", process.cwd());
const cors = require("cors");
app.use(cors());

var admin = require("firebase-admin");
var serviceAccount = require("/Users/riohazama/Downloads/nowbeats-59871-firebase-adminsdk-fbsvc-102582102f.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const redirectUri = `http://192.168.11.27:${port}/callback`;

app.get("/login", (req, res) => {
  const scope = "user-read-currently-playing";
  console.log("process.env.CLIENT_ID:", cliendId);
  console.log(redirectUri);
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${cliendId}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  console.log("Generated authUrl:", authUrl);
  const response = { authUrl: authUrl };
  console.log("Sending response:", response);
  res.json(response);
});

//login→callback周りの挙動理解する
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      //↓↓ここ無心でコピペしてしまってる
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to get token" });
  }
});

app.get("/current-track", async (req, res) => {
  const accessToken = req.query.accessToken;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, //意味がわからない
        },
      }
    );

    if (!response.data || !response.data.item) {
      return res.status(404).json({ error: "No track currently playing" });
    }

    const track = {
      name: response.data.item.name,
      artist: response.data.item.artists.map((artist) => artist.name).join(","),
      album: response.data.item.album.name,
      albumImage: response.data.item.album.images[0].url,
    };

    res.json(track);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch track" });
  }
});

app.post("/share-track", async (req, res) => {
  const { track, comment, userId } = req.body;

  try {
    await db.collection("sharedTracks").add({
      userId,
      track,
      comment,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: "Track shared successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to share track" });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const snapshot = await db
      .collection("sharedTracks")
      .orderBy("timestamp", "desc")
      .get();
    const tracks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch feed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Login endpoint: http://localhost:${port}/login`);
  console.log(`Callback endpoint: http://localhost:${port}/callback`);
});
