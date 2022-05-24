import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ImageUploader = () => {
  const [profileImage, setProfileImage] = useState("");
  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need access to the camera roll.");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      console.log(response);
    }

    if (!response.cancelled) {
      setProfileImage(response.uri);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={openImageLibrary}>
        <Text>Upload Image</Text>
      </TouchableOpacity>
      <Text>Skip</Text>
    </View>
  );
};

export default ImageUploader;
