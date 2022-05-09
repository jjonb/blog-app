import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const Blog = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [blogText, setBlogText] = useState(props.text);

  return (
    <View style={{ flex: 1, borderWidth: 1, borderColor: "black" }}>
      <Text style={{ fontSize: 18, color: "black" }}>{props.subject}</Text>

      {toggleEdit ? (
        <TextInput
          style={{ outline: 0, width: 150 }}
          autoFocus={true}
          onChangeText={setBlogText}
          onSubmitEditing={() => {
            props.editBlog(props._id, blogText, props.authorId);
            setToggleEdit(false);
          }}
          value={blogText}
        />
      ) : (
        <Text style={{ fontSize: 18, color: "black" }}>{blogText}</Text>
      )}

      <TouchableOpacity
        onPress={() => {
          if (props.userId !== props.authorId) return;
          if (toggleEdit === true) {
            props.editBlog(props._id, blogText, props.authorId);
          }
          setToggleEdit(!toggleEdit);
        }}
      >
        {toggleEdit ? (
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
            Save
          </Text>
        ) : (
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
            Edit
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.deleteBlog(props._id, props.authorId)}
      >
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
          Delete
        </Text>
      </TouchableOpacity>

      <Text>Username: {props.author}</Text>
    </View>
  );
};

export default Blog;