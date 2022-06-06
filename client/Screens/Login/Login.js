import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

//<FontAwesome5 name="user-edit" size={24} color="black" />
//<MaterialCommunityIcons name="email" size={24} color="black" />
//<Entypo name="key" size={24} color="black" />
//<Entypo name="lock" size={24} color="black" />
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [userName, setUserName] = useState("");

  const [pageSetting, setPageSetting] = useState("Login");

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
            props.navigation.navigate("Public");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
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
        props.navigation.navigate("Public");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submit = () => {
    if (pageSetting === "Login") {
      login();
    } else if (pageSetting === "Register") {
      register();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 183,
          width: 100 + "%",
          resizeMode: "contain",
          top: 78,
          marginBottom: 125,
        }}
        source={require("../../assets/logo.png")}
      />
      <Text style={{ marginBottom: 5, fontWeight: "bold", fontSize: 36 }}>
        {" "}
        Welcome,{" "}
      </Text>
      {pageSetting === "Login" ? (
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
          Login to continue
        </Text>
      ) : (
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
          Sign up to continue
        </Text>
      )}
      <View style={{ marginTop: 20 }}>
        {pageSetting === "Login" ? null : (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ top: 8, marginRight: 3 }}>
              <FontAwesome5 name="user-edit" size={24} color="black" />
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={setUserName}
              value={userName}
              placeholder="Name"
            />
          </View>
        )}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ top: 8, marginRight: 3 }}>
            <MaterialCommunityIcons name="email" size={30} color="black" />
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ top: 8, marginRight: 3 }}>
            <Entypo name="key" size={24} color="black" />
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />
        </View>
        {pageSetting === "Login" ? null : (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ top: 8, marginRight: 3 }}>
              <Entypo name="lock" size={24} color="black" />
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={setConfirmPW}
              value={confirmPW}
              placeholder="Confirm Password"
            />
          </View>
        )}
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={submit}>
          {pageSetting === "Login" ? (
            <Text
              style={{
                fontSize: 20,
                color: "#f9f9fb",
              }}
            >
              Login
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 20,
                color: "#f9f9fb",
              }}
            >
              Sign up
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (pageSetting === "Login") setPageSetting("Register");
          else setPageSetting("Login");
        }}
      >
        {pageSetting === "Login" ? (
          <Text
            style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}
          >
            Don't have an account?{"\n"}Sign up
          </Text>
        ) : (
          <Text
            style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}
          >
            Already have an account?{"\n"}Login
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
