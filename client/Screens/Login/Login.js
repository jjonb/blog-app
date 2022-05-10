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

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.userData.id) props.navigation.navigate("Admin");
  }, [props.userData]);

  let UrlString = "localhost";

  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  const register = () => {
    props.navigation.navigate("Register");
  };

  const login = () => {
    // make a request to endpoint with email and password
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
        <View style={styles.button}>
          <TouchableOpacity onPress={login}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginRight: 100,
                marginTop: 100,
                backgroundColor: "#12a6e6",
                borderRadius: 10,
                width: 70,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={register}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginTop: 100,
                backgroundColor: "#12a6e6",
                borderRadius: 10,
                width: 80,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
