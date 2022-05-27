import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import ProfileStyles from "./ProfileStyles";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
// import { launchImageLibrary } from "react-native-image-picker";

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};
const Profile = (props) => {
  const [profileImage, setProfileImage] = useState();
  const [images, setImages] = useState([]);

  let UrlString = "localhost";

  const getImages = async () => {
    return await axios.get();
  };

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!_image.cancelled) {
      setProfileImage(_image.uri);
    }
  };

  const uploadProfileImage = () => {
    // const formData = new FormData();
    // formData.append("photo", {
    //   name: photo.fileName,
    //   uri: profileImage,
    //   type: photo.type,
    // });

    // await axios.post(`http://${UrlString}:5050/user/upload`, formData, {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    fetch(`http://${UrlString}:5050/user/upload`, {
      method: "POST",
      body: createFormData(profileImage),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  console.log(profileImage);
  return (
    <View style={ProfileStyles.container}>
      <View>
        <TouchableOpacity onPress={addImage}>
          <Image
            style={ProfileStyles.imgContainer}
            source={{ uri: profileImage }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={uploadProfileImage}>
          <Text> Upload Profile Image</Text>
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
