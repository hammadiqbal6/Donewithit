import { Platform } from "react-native";
import Constants from "expo-constants";

const localhost = Platform.OS === "android" ? "10.0.2.2" : "localhost";

const settings = {
  apiUrl:
    Constants.expoConfig?.extra?.apiUrl ||
    Constants.manifest?.extra?.apiUrl ||
    `http://${localhost}:9000/api`,
};

export default settings;
