import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import { useEffect, useState } from "react";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreToken = async () => {
    const user = await authStorage.getUser();
    if (user) {
      setUser(user);
    }
    setIsReady(true);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  useEffect(() => {
    console.log(isReady);
    const hideSplash = async () => await SplashScreen.hideAsync();
    hideSplash();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
