import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function PostScreen() {
  const [trackId, setTrackId] = useState(null);
  const [comment, setComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const isRealtime = true;

  const dummyTrack = {
    id: "demo123",
    name: "Stayin' Alive",
    artist: "Bee Gees",
    album: "Saturday Night Fever",
    albumImage:
      "https://i.scdn.co/image/ab67616d0000b273b2e65f5885e6a23bda4b8c04",
  };

  const searchResults = [
    { id: "1", name: "Dancing Queen", artist: "ABBA" },
    { id: "2", name: "Bohemian Rhapsody", artist: "Queen" },
  ];

  const selectedTrack = trackId ? dummyTrack : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      {showSearch ? (
        <FlatList
          ListHeaderComponent={
            <TextInput
              placeholder="曲名やアーティストで検索"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          }
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.searchItem}
              onPress={() => {
                setTrackId(item.id);
                setShowSearch(false);
              }}
            >
              <Text style={styles.searchItemText}>
                {item.name} - {item.artist}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {!selectedTrack && (
            <TouchableOpacity
              style={styles.dummyCard}
              onPress={() => setShowSearch(true)}
            >
              <Image
                source={{
                  uri: "https://via.placeholder.com/300x300.png?text=Add+Song",
                }}
                style={styles.dummyImage}
              />
              <Text style={styles.dummyText}>タップして曲を追加</Text>
            </TouchableOpacity>
          )}

          {selectedTrack && (
            <View style={styles.trackCard}>
              <Image
                source={{ uri: selectedTrack.albumImage }}
                style={styles.albumImage}
              />
              <View style={styles.trackTextArea}>
                <Text style={styles.trackName}>{selectedTrack.name}</Text>
                <Text style={styles.trackArtist}>{selectedTrack.artist}</Text>
                <Text style={styles.trackAlbum}>{selectedTrack.album}</Text>
                {isRealtime && (
                  <Text style={styles.realtime}>🔥 リアルタイム</Text>
                )}
                <TouchableOpacity onPress={() => setShowSearch(true)}>
                  <Text style={styles.changeTrackText}>曲を変更する</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TextInput
            placeholder="コメントを入力"
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.postButton,
              !(trackId && comment.trim()) && styles.postButtonDisabled,
            ]}
            disabled={!(trackId && comment.trim())}
          >
            <Text style={styles.postButtonText}>投稿する</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  dummyCard: {
    alignItems: "center",
    marginBottom: 20,
  },
  dummyImage: {
    width: 240,
    height: 240,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  dummyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#888",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    margin: 20,
  },
  searchItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  searchItemText: {
    fontSize: 16,
  },
  trackCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  trackTextArea: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  trackName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  trackArtist: {
    fontSize: 16,
    color: "#444",
  },
  trackAlbum: {
    fontSize: 14,
    color: "#888",
  },
  realtime: {
    marginTop: 4,
    color: "tomato",
    fontWeight: "bold",
  },
  changeTrackText: {
    marginTop: 8,
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 14,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    textAlignVertical: "top",
    height: 100,
    fontSize: 16,
    marginBottom: 20,
  },
  postButton: {
    backgroundColor: "#1DB954",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  postButtonDisabled: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
