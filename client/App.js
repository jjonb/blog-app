import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Admin from "./Screens/Admin";
import Register from "./Screens/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState("");
  useEffect(() => {
    // localhost is needed if this request is coming from a web browser
    let UrlString = "localhost";

    // "10.0.2.2" is needed if this request is coming from physical device
    if (Platform.OS == "android") {
      UrlString = "10.0.2.2";
    }

    // look inside AsyncStorage for an item (token)
    AsyncStorage.getItem("token")
      .then((tokenRes) => {
        setToken(tokenRes);
        // make a request to get userdata with unique token
        return axios.get(`http://${UrlString}:5050/user`, {
          // passing token response with key expected from auth middleware
          headers: { "x-auth-token": tokenRes },
        });
      })
      .then((userResponse) => {
        // set userData state with response from successful request
        setUserData(userResponse.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEFfect to make a request to get all blogs, we would need to send the token

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <Login
              userData={userData}
              setUserData={setUserData}
              setToken={setToken}
              {...props}
            ></Login>
          )}
        </Stack.Screen>
        <Stack.Screen name="Register" options={{ headerShown: false }}>
          {(props) => <Register {...props}></Register>}
        </Stack.Screen>
        <Stack.Screen name="Admin" options={{ headerShown: false }}>
          {(props) => (
            <Admin
              setUserData={setUserData}
              userData={userData}
              token={token}
              setToken={setToken}
              {...props}
            ></Admin>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}