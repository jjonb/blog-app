import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  pageTitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  subjectText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 19,
  },
  blogText: {},
  authorText: {
    marginBottom: 15,
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: 16,
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
