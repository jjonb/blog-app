import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./styles.js";

const NewBlog = (props) => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  let UrlString = "localhost";

  // "10.0.2.2" is needed if this request is coming from physical device
  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  const createPost = async () => {
    await axios.post(
      `http://${UrlString}:5050/blog/new`,
      { subject: subject, text: text },
      {
        headers: { "x-auth-token": props.token },
      }
    );

    setSubject("");
    setText("");
    props.navigation.goBack();
  };

  return (
    <View>
      <TextInput
        style={styles.subjectInput}
        placeholder="Subject"
        onChangeText={setSubject}
        value={subject}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Write your Blog"
        onChangeText={setText}
        value={text}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity onPress={createPost}>
          <Text style={styles.button}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={styles.button}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewBlog;
