import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import Minion from "./components/minion";
import MyTextInput from "./components/textinput";
import Colors from "./constants/colors";
const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  _blurAll() {
    this.ti1.blur();
    this.ti2.blur();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this._blurAll()}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View
            style={{ width, height, position: "absolute", top: 0, left: 0 }}
          >
            <ImageBackground
              style={{ flex: 1 }}
              source={require("./assets/banana_bg.jpg")}
            />
            <View
              style={{
                position: "absolute",
                width,
                height,
                backgroundColor: "rgba(0,0,0,.7)"
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Minion ref={m => (this.minion = m)} size={200} />
          </View>
          <View style={{ flex: 1 }}>
            <View>
              <Text style={styles.text}>Email</Text>
              <MyTextInput
                ref={ti => (this.ti1 = ti)}
                onFocus={() => {
                  if (this.ti1.getText().trim().length == 0)
                    this.minion.stare();
                }}
                onBlur={() => {
                  if (this.ti1.getText().trim().length == 0)
                    this.minion.reset();
                }}
                onChangeText={t => this.minion.stareAt(t)}
                placeholder={"email@domain.com"}
                secureTextEntry={false}
              />
            </View>
            <View>
              <Text style={styles.text}>Password</Text>
              <MyTextInput
                ref={ti => (this.ti2 = ti)}
                onFocus={() => {
                  this.minion.hideFace();
                }}
                onBlur={() => {
                  this.minion.unhideFade();
                }}
                onChangeText={t => {}}
                secureTextEntry={true}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.main,
              paddingVertical: 16,
              paddingHorizontal: 48,
              marginVertical: 32,
              borderRadius: 32,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontWeight: "600" }}>BA-NA-NA!</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEA00",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: Colors.main,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 32,
    fontSize: 18
  }
});
