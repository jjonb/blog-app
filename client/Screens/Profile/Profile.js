import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import ProfileStyles from "./ProfileStyles";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const SERVER_URL = "http://localhost:5050";

const createFormData = (image, body = {}) => {
  const data = new FormData();

  data.append("image", {
    name: image.fileName,
    type: image.type,
    uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const Profile = () => {
  const [image, setImage] = useState(null);

  const choosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    console.log("image is =>", image);
  }, [image]);

  const uploadPhoto = async () => {
    const formData = createFormData(image);
    console.log("Form data that was created =>", formData);
    await axios.post(`${SERVER_URL}/user/uploadImage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("uploaded");
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={choosePhoto}>
          <Image style={ProfileStyles.imgContainer} source={{ uri: image }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={uploadPhoto}>Upload</Text>
        </TouchableOpacity>
      </View>
      <View style={ProfileStyles.textInputContainer}>
        <TextInput
          style={ProfileStyles.textInput}
          // onChangeText={setUserName}
          // value={userName}
          placeholder="Name"
        />
        <TextInput
          style={ProfileStyles.textInput}
          // onChangeText={setEmail}
          // value={email}
          placeholder="Email"
        />
        <TextInput
          style={ProfileStyles.textInput}
          // onChangeText={setPassword}
          // value={password}
          placeholder="Password"
        />
        <TouchableOpacity style={ProfileStyles.button}>
          <Text
            style={{
              fontSize: 20,
              color: "#F9F9FB",
            }}
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: "#FF3333",
              textAlign: "center",
            }}
          >
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Profile;
