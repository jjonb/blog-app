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
import NewBlog from "./../NewBlog/NewBlog";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";

const Public = (props) => {
  const [signedIn, setSignedIn] = useState(false);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  let UrlString = "localhost";
  useEffect(() => {
    if (props.userData.id) setSignedIn(true);
    else setSignedIn(false);
  }, [props.userData.id]);

  // "10.0.2.2" is needed if this request is coming from physical device
  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  const getBlogs = async () => {
    return await axios
      .get(`http://${UrlString}:5050/blog/all`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(async () => {
    getBlogs();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 4 }}>
        <Text style={styles.pageTitle}>Welcome, let's start reading</Text>
      </View>
      {signedIn ? <Text>Logged in</Text> : null}
      <FlatList
        inverted={true}
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Blog", {
                    blog: item,
                  });
                }}
              >
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
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
      {signedIn ? (
        <View style={{ position: "absolute", right: 5, bottom: 10, zIndex: 3 }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("New Blog");
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={require("../../assets/newblog.png")}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Public;
