import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ProfileStyles from "./ProfileStyles";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const Profile = (props) => {
  const [profileImage, setProfileImage] = useState("../../assets/profile.png");
  const [progress, setProgress] = useState(0);
  let UrlString = "localhost";

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
  console.log(profileImage);
  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });

    await axios.post(`http://${UrlString}:5050/user/uploads`, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authorization: props.token,
      },
      onUploadProgress: ({ loaded, total }) => setProgress(loaded / total),
    });
  };

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
        {progress ? <Text>{progress}</Text> : null}
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
