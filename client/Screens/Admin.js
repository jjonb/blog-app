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
import Blog from "../Components/Blog.js";

const Admin = (props) => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [newText, setNewText] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  //const [toggleEdit, setToggleEdit] = useState(false);

  let UrlString = "localhost";

  // "10.0.2.2" is needed if this request is coming from physical device
  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  const getBlogs = async () => {
    return await axios
      .get(`http://${UrlString}:5050/blog`, {
        headers: { "x-auth-token": props.token },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    if (!props.userData.id) {
      props.navigation.navigate("Login");
    }
  }, [props.userData]);

  const createPost = async () => {
    await axios.post(
      `http://${UrlString}:5050/blog/new`,
      { subject: subject, text: text },
      {
        headers: { "x-auth-token": props.token },
      }
    );

    getBlogs();
  };

  const deleteBlog = async (id) => {
    await axios.delete(`http://${UrlString}:5050/blog/`, {
      data: {
        _id: id,
      },
      headers: { "x-auth-token": props.token },
    });
    getBlogs();
  };

  // const editBlog = (id) => {
  //   console.log("editing");
  // };

  const editBlog = async (id, newText) => {
    await axios.put(
      `http://${UrlString}:5050/blog/update`,
      { _id: id, text: newText },
      {
        headers: { "x-auth-token": props.token },
      }
    );
    console.log("update successful");
    getBlogs();
  };

  // const blog = ({ item }) => {

  // };

  return (
    <View style={styles.blogcontainer}>
      <Text>Hi im Admin</Text>

      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Blog
                item={item}
                _id={item._id}
                subject={item.subject}
                text={item.text}
                deleteBlog={deleteBlog}
                editBlog={editBlog}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
      <TextInput
        style={{
          borderColor: "white",
          width: 360,
          height: 50,
          padding: 4,
          paddingLeft: 24,
          borderRadius: 10,
          marginTop: 20,
          backgroundColor: "white",
          fontSize: 18,
          marginHorizontal: 20,
        }}
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
      <Pressable
        onPress={async () => {
          await AsyncStorage.setItem("token", "");
          props.setToken("");
          props.setUserData({});
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginRight: 100,
            marginTop: 100,
            backgroundColor: "#12a6e6",
            borderRadius: 10,
            width: 80,
            marginLeft: 300,
            textAlign: "center",
          }}
        >
          Log out
        </Text>
      </Pressable>
      <TouchableOpacity onPress={createPost}>
        <Text
          style={{
            color: "white",
            fontSize: 20,

            backgroundColor: "#12a6e6",
            borderRadius: 10,
            width: 70,
            marginLeft: 50,
            textAlign: "center",
          }}
        >
          Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  blogcontainer: {},
  logout: {
    backgroundColor: "#ebf1fa",
    fontSize: 18,
    height: 400,
    width: 400,
    borderRadius: 20,

    alignItems: "center",
    shadowOffset: { width: -7, height: 8 },
    shadowOpacity: 0.2,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 200,
  },
  textInput: {
    borderColor: "white",
    width: 360,
    height: 200,
    padding: 4,
    paddingLeft: 24,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "white",
    fontSize: 18,
    marginHorizontal: 20,
  },
});

export default Admin;
