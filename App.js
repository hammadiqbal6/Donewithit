import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreToken = async () => {
      const storedUser = await authStorage.getUser();
      if (storedUser) setUser(storedUser);
      setIsReady(true);
    };
    restoreToken();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    SplashScreen.hideAsync().catch(() => {});
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
