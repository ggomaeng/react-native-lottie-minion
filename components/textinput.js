import React, { Component } from "react";
import { Animated, View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/colors";

const DEFAULT_FONT_SIZE = 14;
const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 70;

export default class TI extends Component {
  state = {
    top: new Animated.Value(0),
    left: new Animated.Value(0),
    fontSize: new Animated.Value(DEFAULT_FONT_SIZE),
    text: ""
  };

  _onFocus() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, { toValue: 10 }),
      Animated.timing(this.state.top, { toValue: -16 }),
      Animated.timing(this.state.left, { toValue: -16 })
    ]).start();
    this.props.onFocus();
  }

  _onBlur() {
    const { text } = this.state;
    this.ti.blur();
    if (text.trim().length == 0) {
      Animated.parallel([
        Animated.timing(this.state.fontSize, { toValue: DEFAULT_FONT_SIZE }),
        Animated.timing(this.state.top, { toValue: 0 }),
        Animated.timing(this.state.left, { toValue: 0 })
      ]).start();
    }

    this.props.onBlur();
  }

  blur() {
    this.ti.blur();
  }

  getText() {
    return this.state.text;
  }

  _onChangeText(text) {
    this.setState({ text });
    this.props.onChangeText(text);
  }

  render() {
    const { top, left, fontSize, text } = this.state;
    const { placeholder, secureTextEntry } = this.props;
    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.placeholder, { top, fontSize }]}>
          {placeholder}
        </Animated.Text>
        <TextInput
          ref={ti => (this.ti = ti)}
          value={text}
          onChangeText={text => this._onChangeText(text)}
          onFocus={() => this._onFocus()}
          onBlur={() => this._onBlur()}
          onSubmitEditing={() => this._onBlur()}
          secureTextEntry={secureTextEntry}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            padding: 16,
            color: "white"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 8,
    padding: 16,
    justifyContent: "center"
  },
  placeholder: {
    color: "#eee"
  }
});
