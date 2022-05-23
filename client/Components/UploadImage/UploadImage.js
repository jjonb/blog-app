import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  };

  return (
    <View>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <View>
        <TouchableOpacity onPress={addImage}>
          <Text>{image ? "Edit" : "Upload"} Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadImage;
