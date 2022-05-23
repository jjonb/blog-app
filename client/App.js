import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

import Login from "./Screens/Login/Login";
import Admin from "./Screens/Admin/Admin";
import Public from "./Screens/Public/Public";
import Profile from "./Screens/Profile/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Platform } from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState("");

  let [fontsLoaded, error] = useFonts({
    Amethysta: require("./assets/fonts/Amethysta-Regular.ttf"),
    Comfortaa: require("./assets/fonts/Comfortaa-VariableFont_wght.ttf"),
  });

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
        if (tokenRes === null) throw new Error("No token");
        setToken(tokenRes);
        // make a request to get userdata with unique token
        return axios.get(`http://${UrlString}:5050/user`, {
          // passing token response with key expected from auth middleware
          headers: { "x-auth-token": tokenRes },
        });
      })
      .then((userResponse) => {
        // set userData state with response from successful request
        //console.log("here");
        setUserData(userResponse.data);
      })
      .catch((err) => {
        console.log(err.message);
      }); // console.log(err));
  }, []);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();

  // useEFfect to make a request to get all blogs, we would need to send the token
  return (
    <NavigationContainer>
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName="Public"
        //style={{ backgroundColor: "red" }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Public"
          options={{
            title: "BirLog",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#f2f4f3",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerRight: () => (
              <Image
                style={{ height: 25, width: 25 }}
                source={require("./assets/profile.png")}
              />
            ),
          }}
        >
          {(props) => (
            <Public
              userData={userData}
              setUserData={setUserData}
              setToken={setToken}
              {...props}
            ></Public>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <Login
              userData={userData}
              setUserData={setUserData}
              setToken={setToken}
              {...props}
            ></Login>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Profile">
          {(props) => (
            <Profile
              userData={userData}
              setUserData={setUserData}
              setToken={setToken}
              {...props}
            ></Profile>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Admin">
          {(props) => (
            <Admin
              setUserData={setUserData}
              userData={userData}
              token={token}
              setToken={setToken}
              {...props}
            ></Admin>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
      {/* <Stack.Navigator initialRouteName="MyDrawer">
        <Stack.Screen name="MyDrawer" options={{ headerShown: false }}>
          {(props) => (
            <MyDrawer
              userData={userData}
              setUserData={setUserData}
              setToken={setToken}
              {...props}
            ></MyDrawer>
          )}
        </Stack.Screen> */}
      {/* <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <Login
              userData={userData}
              setUserData={setUserData}
              setToken={setToken}
              {...props}
            ></Login>
          )}
        </Stack.Screen>
        <Stack.Screen name="Public" options={{ headerShown: false }}>
          {(props) => (
            <Public
              setUserData={setUserData}
              userData={userData}
              //token={token}
              //setToken={setToken}
              {...props}
            ></Public>
          )}
        </Stack.Screen> */}
      {/* <Stack.Screen name="Admin" options={{ headerShown: false }}>
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
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
