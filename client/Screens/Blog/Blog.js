import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./styles.js";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";

const Blog = (props) => {
  // const isFocused = useIsFocused();
  let UrlString = "localhost";

  // "10.0.2.2" is needed if this request is coming from physical device
  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  // useEffect(async () => {}, [isFocused]);
  const blog = props.route.params.blog;
  const userMatch = props.route.params.userMatch;
  console.log(blog.subject);
  const [subject, setSubject] = useState(blog.subject);
  const [text, setText] = useState(blog.text);
  // const getBlog = async (id) => {
  //   return await axios
  //     .get(`http://${UrlString}:5050/blog/get`, {
  //       params: {
  //         _id: id,
  //       },
  //       headers: { "x-auth-token": props.token },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   getBlog(blog._id);
  //   //console.log("a");
  // }, []);
  //console.log(subject);
  //console.log(blog.subject);
  // const [subject, setSubject] = useState(blog.subject);
  // const [text, setText] = useState(blog.text);
  const deleteBlog = async (id, authorId) => {
    if (props.userData.id !== authorId) {
      return;
    }
    await axios.delete(`http://${UrlString}:5050/blog/`, {
      data: {
        _id: id,
      },
      headers: { "x-auth-token": props.token },
    });
  };

  const editText = async (id, newText, authorId) => {
    if (props.userData.id !== authorId) {
      return;
    }
    await axios.put(
      `http://${UrlString}:5050/blog/update`,
      { _id: id, text: newText },
      {
        headers: { "x-auth-token": props.token },
      }
    );
    console.log("update successful");
  };
  const editSubject = async (id, newSubject, authorId) => {
    if (props.userData.id !== authorId) {
      return;
    }
    await axios.put(
      `http://${UrlString}:5050/blog/update/subject`,
      { _id: id, subject: newSubject },
      {
        headers: { "x-auth-token": props.token },
      }
    );
    console.log("update successful");
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 15,
          paddingBottom: 25,
          borderBottomWidth: 4,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 398, height: 250 }}
          source={require("../../assets/blogImage.png")}
        />
      </View>
      {userMatch ? (
        <TextInput
          style={{
            borderWidth: 0,
            width: 100 + "%",
            fontSize: 24,
            textAlign: "center",
            marginTop: 18,
            marginBottom: 19,
          }}
          onChangeText={setSubject}
          onSubmitEditing={() => {
            editSubject(blog._id, subject, blog.authorId);
          }}
          value={subject}
        />
      ) : (
        <Text style={styles.subjectText}>{blog.subject}</Text>
      )}
      {userMatch ? (
        <TextInput
          style={{
            borderWidth: 0,
            width: 100 + "%",
            fontSize: 17,
            textAlign: "center",
            marginTop: 18,
            marginBottom: 19,
          }}
          onChangeText={setText}
          onSubmitEditing={() => {
            editText(blog._id, text, blog.authorId);
          }}
          value={text}
        />
      ) : (
        <Text style={styles.blogText}>{blog.text}</Text>
      )}
      <View
        style={{ flexDirection: "row", alignContent: "center", marginLeft: 10 }}
      >
        {userMatch ? (
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/profile.png")}
          />
        ) : (
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/profileImage.png")}
          />
        )}

        <Text style={styles.authorText}>{blog.author}</Text>
      </View>
      {userMatch ? (
        <TouchableOpacity
          onPress={() => {
            deleteBlog(blog._id, blog.authorId);
            props.navigation.goBack();
          }}
          style={{ alignSelf: "center" }}
        >
          <Text style={{ color: "red" }}>Delete Blog</Text>
        </TouchableOpacity>
      ) : null}
      {/* <View style={{ position: absolute, }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text>Return</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Blog;
