import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./styles";
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
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 4 }}>
        <Text style={styles.pageTitle}>Welcome, let's start reading</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <View
                style={{
                  marginTop: 15,
                  paddingBottom: 25,
                  borderBottomWidth: 4,
                }}
              >
                <Image
                  style={{ width: 398, height: 250 }}
                  source={require("../../assets/blogImage.png")}
                />
              </View>
              <Text style={styles.subjectText}>{item.subject}</Text>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                {/* <Text style={styles.blogText}>{item.text}</Text> */}
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/profile.png")}
                />
                <Text style={styles.authorText}>{item.author}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
      {/* <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Public;
