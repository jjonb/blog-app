import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  blogContainer: {
    flex: 1,
  },
  subjectInput: {
    borderColor: "white",
    width: 360,
    height: 50,
    padding: 4,
    paddingLeft: 24,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "white",
    fontSize: 18,
    marginHorizontal: 20,
  },
  textInput: {
    borderColor: "white",
    width: 360,
    height: 200,
    padding: 4,
    paddingLeft: 24,
    borderRadius: 10,
    margin: 20,
    backgroundColor: "white",
    fontSize: 18,
  },
  button: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#12a6e6",
    borderRadius: 10,
    width: 70,
    textAlign: "center",
  },
  logoutButton: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#12a6e6",
    borderRadius: 10,
    width: 80,
    marginLeft: 300,
    textAlign: "center",
    marginRight: 100,
    marginTop: 100,
  },
  logout: {
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
});

export default styles;
