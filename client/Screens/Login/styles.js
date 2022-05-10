import { StyleSheet } from "react-native";

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

export default styles;
