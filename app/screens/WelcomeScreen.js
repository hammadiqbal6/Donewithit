import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      blurRadius={Platform.OS === "web" ? 0 : 3}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.overlay} />
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <AppText style={styles.brand}>DoneWithIt</AppText>
        <AppText style={styles.tagline}>Sell What You Don&apos;t Need</AppText>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(12, 12, 12, 0.25)",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
    ...Platform.select({
      web: {
        maxWidth: 420,
      },
    }),
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  brand: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  tagline: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 8,
  },
});

export default WelcomeScreen;
