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
import Blog from "../../Components/Blog/Blog.js";
import styles from "./styles.js";
import UploadImage from "../../Components/UploadImage/UploadImage.js";

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
      .get(`http://${UrlString}:5050/blog/all`)
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
      props.navigation.navigate("Public");
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
    setSubject("");
    setText("");
  };

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
    getBlogs();
  };

  // const editBlog = (id) => {
  //   console.log("editing");
  // };

  console.log(props.image);

  const editBlog = async (id, newText, authorId) => {
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
    getBlogs();
  };

  // const blog = ({ item }) => {

  // };

  return (
    <View style={styles.blogContainer}>
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
                userId={props.userData.id}
                subject={item.subject}
                text={item.text}
                author={item.author}
                authorId={item.authorId}
                img={item.img}
                deleteBlog={deleteBlog}
                editBlog={editBlog}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
      <UploadImage />
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
      <Pressable
        onPress={async () => {
          await AsyncStorage.setItem("token", "");
          props.setToken("");
          props.setUserData({});
        }}
      >
        <Text style={styles.logoutButton}>Log out</Text>
      </Pressable>
      <TouchableOpacity onPress={createPost}>
        <Text style={styles.button}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Admin;
