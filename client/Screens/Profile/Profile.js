import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfileStyles from "./ProfileStyles";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
const SERVER_URL = "http://localhost:5050";

const Profile = (props) => {
  // const createFormData = (image, body = {}) => {
  //   const data = new FormData();

  //   data.append("image", {
  //     name: image.fileName,
  //     type: image.type,
  //     uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
  //   });

  //   Object.keys(body).forEach((key) => {
  //     data.append(key, body[key]);
  //   });

  //   return data;
  // };
  let UrlString = "localhost";

  // "10.0.2.2" is needed if this request is coming from physical device
  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }
  const [userName, setUserName] = useState(props.userData.userName);
  const [email, setEmail] = useState(props.userData.email);

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
    // console.log("image is =>", image);
  }, [image]);

  const uploadPhoto = async () => {
    // console.log("image is =>", image);
    // const formData = createFormData(image);
    // console.log("Form data that was created =>", formData);
    // // await axios.put(`${SERVER_URL}/user/uploadImage`, formData, {
    // //   headers: {
    // //     "Content-Type": "multipart/form-data",
    // //   },
    // // });
    console.log("uploaded");
  };
  //console.log(image);
  const windowHeight = Dimensions.get("window").height;
  const updateAuthors = async (usr) => {
    await axios.put(
      `http://${UrlString}:5050/blog/updateAuthors`,
      { newUserName: usr },
      {
        headers: { "x-auth-token": props.token },
      }
    );
    console.log("update successful");
  };

  const applyChanges = async (eml, usr) => {
    await axios.put(
      `http://${UrlString}:5050/user/updateUser`,
      { newUserName: usr },
      {
        headers: { "x-auth-token": props.token },
      }
    );
    updateAuthors(usr);
    console.log("update successful");
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ width: "100%", height: windowHeight }}>
          <View>
            <TouchableOpacity onPress={choosePhoto}>
              <Image
                style={ProfileStyles.imgContainer}
                source={require("../../assets/profile.png")}
              />
            </TouchableOpacity>
            <View style={{ alignItems: "center", paddingTop: 10 }}>
              <TouchableOpacity>
                <Text style={{ color: "blue" }} onPress={uploadPhoto}>
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={ProfileStyles.textInputContainer}>
            <TextInput
              style={ProfileStyles.textInput}
              onChangeText={setUserName}
              value={userName}
              placeholder="Name"
            />
            <TextInput
              style={ProfileStyles.textInput}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
            <TextInput
              style={ProfileStyles.textInput}
              // onChangeText={setPassword}
              // value={password}
              secureTextEntry={true}
              placeholder="Password"
            />
            <TouchableOpacity
              onPress={() => {
                applyChanges(email, userName);
                props.navigation.goBack();
              }}
              style={ProfileStyles.button}
            >
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
        </View>
      </ScrollView>
      {/* <View style={{ bottom: 10 }}>
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
      </View> */}
    </View>
  );
};
export default Profile;
