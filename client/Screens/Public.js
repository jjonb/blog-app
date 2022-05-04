import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//import Blog from "../Components/Blog.js";

const Public = (props) => {
  const [data, setData] = useState([]);
  let UrlString = "localhost";

  // "10.0.2.2" is needed if this request is coming from physical device
  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }
  useEffect(async () => {
    return await axios
      .get(`http://${UrlString}:5050/blog/all`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text>Public (all blogs)</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.text}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Public;
