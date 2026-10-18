import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, ActivityIndicator as Spinner, Platform } from "react-native";
import colors from "../config/colors";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {Platform.OS === "web" ? (
        <Spinner size="large" color={colors.primary} />
      ) : (
        <LottieView
          autoPlay
          loop
          source={require("../assets/animations/loader.json")}
          style={styles.animation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.85)",
    height: "100%",
    width: "100%",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 150,
    height: 150,
  },
});

export default ActivityIndicator;
