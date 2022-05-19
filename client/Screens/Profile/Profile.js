import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import ProfileStyles from "./ProfileStyles";
const Profile = () => {
  return (
    <View>
      <View>
        <Image
          style={ProfileStyles.imgContainer}
          source={require("../../assets/profile.png")}
        />
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
