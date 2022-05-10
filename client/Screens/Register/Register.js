import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  let UrlString = "localhost";

  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }
  const register = () => {
    // make request to api and pass email, password, userName
    axios
      .post(`http://${UrlString}:5050/user/register`, {
        email: email,
        userName: userName,
        password: password,
      })
      .then(function (response) {
        // redirect user to Login screen
        console.log(response);
      })
      .then(() => {
        axios
          .post(`http://${UrlString}:5050/user/login`, {
            email: email,
            password: password,
          })
          .then((response) => {
            // on successful request store userData in state in App.js
            props.setUserData(response.data.user);
            // set item in storage "token" to value from token received from successful request
            // sending AsyncStorage to next "then" method in Promise chain
            props.setToken(response.data.token);
            return AsyncStorage.setItem("token", response.data.token);
          })
          .then(() => {
            props.navigation.navigate("Admin");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text>Register Page</Text>
      <TextInput
        style={{
          borderWidth: 1,
          fontSize: 18,
        }}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={{
          borderWidth: 1,
          fontSize: 18,
        }}
        onChangeText={setUserName}
        value={userName}
        placeholder="Username"
      />
      <TextInput
        style={{
          borderWidth: 1,
          fontSize: 18,
        }}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <TouchableOpacity>
        <Text onPress={register}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
