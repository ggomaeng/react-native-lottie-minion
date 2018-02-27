import React, { Component } from "react";
import { Animated, View, Text, StyleSheet, Platform } from "react-native";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;

import Colors from "../constants/colors";

const STARE_STATE = 0.33;
const THRESHOLD = 50;

export default class Minion extends Component {
  state = {
    minion: require("../assets/minion.json"),
    hands: require("../assets/hands.json"),
    minion_progress: new Animated.Value(0),
    hands_progress: new Animated.Value(0)
  };

  componentDidMount() {}

  componentWillUnmount() {
    this.minion.reset();
    this.hands.reset();
  }

  stare() {
    Animated.timing(this.state.minion_progress, {
      toValue: 0.33,
      duration: 500
    }).start();
  }

  reset() {
    Animated.timing(this.state.minion_progress, {
      toValue: 0,
      duration: 500
    }).start();
  }

  stareAt(text) {
    const { progress } = this.state;
    const toValue = STARE_STATE + text.length / THRESHOLD;
    if (toValue < 1) {
      Animated.timing(this.state.minion_progress, {
        toValue,
        duration: 100
      }).start();
    }
  }

  hideFace() {
    Animated.timing(this.state.hands_progress, {
      toValue: 1,
      duration: 500
    }).start();
  }

  unhideFade() {
    Animated.timing(this.state.hands_progress, {
      toValue: 0,
      duration: 500
    }).start();
  }

  render() {
    const { minion_progress, minion, hands, hands_progress } = this.state;
    const { size } = this.props;
    // const lottieSize = Platform.OS == "ios" ? size / 1.5 : size / 1.5 / 2.6;
    const lottieSize = size / 1.5;
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 6,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eee"
        }}
      >
        <View>
          <Lottie
            loop={false}
            ref={animation => {
              this.minion = animation;
            }}
            style={{
              width: lottieSize,
              height: lottieSize
            }}
            source={minion}
            progress={minion_progress}
            resizeMode="contain"
          />
        </View>
        <View style={{ position: "absolute", left: size / 8 }}>
          <Lottie
            loop={false}
            ref={animation => {
              this.hands = animation;
            }}
            style={{
              width: lottieSize,
              height: lottieSize
            }}
            source={hands}
            progress={hands_progress}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}
