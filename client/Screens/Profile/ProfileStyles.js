import { StyleSheet } from "react-native";
const ProfileStyles = StyleSheet.create({
  imgContainer: {
    height: 125,
    width: 100 + "%",
    resizeMode: "contain",
    top: 134,
    marginBottom: 125,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: "#F2F4F3",
    alignItems: "center",
    marginTop: 30,
  },
  textInput: {
    height: 50,
    width: 350,
    borderRadius: 10,
    backgroundColor: "#F9F9FB",
    textAlign: "center",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    width: 200,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#22333B",
    borderRadius: 20,
    marginBottom: 330,
  },
});
export default ProfileStyles;
