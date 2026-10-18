import React from "react";
import { View, StyleSheet, Modal, Platform, Text } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import colors from "../config/colors";

function UploadScreen({ onDone, progress = 0, visible = false }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        {progress < 1 ? (
          <>
            <Progress.Bar
              color={colors.primary}
              progress={progress || 0.05}
              width={200}
            />
            <Text style={styles.label}>Uploading...</Text>
          </>
        ) : Platform.OS === "web" ? (
          <Text
            style={styles.done}
            onLayout={() => {
              setTimeout(onDone, 600);
            }}
          >
            Done!
          </Text>
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("../assets/animations/done.json")}
            style={styles.animation}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.96)",
  },
  label: {
    marginTop: 16,
    color: colors.medium,
  },
  done: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.secondary,
  },
});

export default UploadScreen;
