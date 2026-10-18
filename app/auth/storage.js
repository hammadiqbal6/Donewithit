import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";

const setItem = async (value) => {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
};

const getItem = async () => {
  if (Platform.OS === "web") {
    return AsyncStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
};

const deleteItem = async () => {
  if (Platform.OS === "web") {
    await AsyncStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
};

const storeToken = async (authToken) => {
  try {
    await setItem(authToken);
  } catch (error) {
    console.log("Error storing auth token", error);
  }
};

const getToken = async () => {
  try {
    return await getItem();
  } catch (error) {
    console.log("Error getting auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (token) return jwtDecode(token);
  return null;
};

const removeToken = async () => {
  try {
    await deleteItem();
  } catch (error) {
    console.log("Error removing auth token", error);
  }
};

export default { storeToken, getToken, removeToken, getUser };
