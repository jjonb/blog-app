import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const Blog = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [blogText, setBlogText] = useState(props.text);
  const [photo, setPhoto] = useState(props.img);

  return (
    <View style={styles.container}>
      <Text style={styles.subjectText}>{props.subject}</Text>
      <Image source={{ uri: photo }} />

      {toggleEdit ? (
        <TextInput
          style={styles.textInput}
          autoFocus={true}
          onChangeText={setBlogText}
          onSubmitEditing={() => {
            props.editBlog(props._id, blogText, props.authorId);
            setToggleEdit(false);
          }}
          value={blogText}
        />
      ) : (
        <Text style={styles.blogText}>{blogText}</Text>
      )}
      {props.userId === props.authorId ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              //if (props.userId !== props.authorId) return;
              if (toggleEdit === true) {
                props.editBlog(props._id, blogText, props.authorId);
              }
              setToggleEdit(!toggleEdit);
            }}
          >
            {toggleEdit ? (
              <Text style={styles.button}>Save</Text>
            ) : (
              <Text style={styles.button}>Edit</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.deleteBlog(props._id, props.authorId)}
          >
            <Text style={styles.button}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <Text>Username: {props.author}</Text>
    </View>
  );
};

export default Blog;
