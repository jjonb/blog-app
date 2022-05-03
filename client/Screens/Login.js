import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#074294",
  },
  login: {
    backgroundColor: "#ebf1fa",
    fontSize: 18,
    height: 400,
    width: 400,
    borderRadius: 20,

    alignItems: "center",
    shadowOffset: { width: -7, height: 8 },
    shadowOpacity: 0.2,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 200,
  },
  textInput: {
    borderColor: "white",
    width: 360,
    height: 44,
    padding: 4,
    paddingLeft: 24,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "white",
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
  },
});

export default Login;
