import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", disabled = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  disabled: {
    opacity: 0.6,
  },
  title: {
    color: colors.white,
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AppButton;
