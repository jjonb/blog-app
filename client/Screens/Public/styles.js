import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  pageTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  subjectText: {
    fontWeight: "bold",
  },
  blogText: {},
  authorText: {
    marginBottom: 15,
  },
  btnContainer: {
    flexDirection: "row",
    marginBottom: 100,
  },
  button: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#12a6e6",
    borderRadius: 10,
    width: 70,
    marginLeft: 50,
    textAlign: "center",
  },
  registerButton: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#12a6e6",
    borderRadius: 10,
    width: 80,
    marginLeft: 300,
    textAlign: "center",
    marginRight: 100,
    //marginTop: 100,
  },
});

export default styles;
