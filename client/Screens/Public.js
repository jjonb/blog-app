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

  useEffect(() => {
    if (props.userData.id) props.navigation.navigate("Admin");
  }, [props.userData]);

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
              <Text style={{ fontWeight: "bold" }}>{item.subject}</Text>
              <Text>{item.text}</Text>
              <Text>Username: {item.author}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginRight: 100,
              marginTop: 100,
              backgroundColor: "#12a6e6",
              borderRadius: 10,
              width: 70,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginTop: 100,
              backgroundColor: "#12a6e6",
              borderRadius: 10,
              width: 80,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Public;
