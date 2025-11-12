import React, { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    if (!query) return;
    const res = await axios.get(`http://10.0.2.2:3000/api/stories`);
    const filtered = res.data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nhập tên truyện..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={search}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("StoryDetail", { id: item.id })}>
            <Text style={styles.item}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, borderColor: "#aaa", borderRadius: 10, padding: 10, marginBottom: 10 },
  item: { fontSize: 18, paddingVertical: 5 },
});
