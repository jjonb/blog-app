import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./styles.js";

const Blog = (props) => {
  const blog = props.route.params.blog;

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
      <Text style={styles.subjectText}>{blog.subject}</Text>
      <Text style={styles.subjectText}>{blog.text}</Text>

      <View style={{ flexDirection: "row", alignContent: "center" }}>
        {/* <Text style={styles.blogText}>{blog.text}</Text> */}
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../../assets/profile.png")}
        />
        <Text style={styles.authorText}>{blog.author}</Text>
      </View>
    </View>
  );
};

export default Blog;
