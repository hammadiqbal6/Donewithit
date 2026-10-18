import * as Location from "expo-location";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    const askPermissions = async () => {
      try {
        if (Platform.OS === "web") {
          if (!navigator?.geolocation) return;
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            () => {},
            { maximumAge: 60000, timeout: 5000 }
          );
          return;
        }

        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) return;

        const position = await Location.getLastKnownPositionAsync();
        if (!position) return;

        const {
          coords: { latitude, longitude },
        } = position;
        setLocation({ latitude, longitude });
      } catch (error) {
        console.log("Location unavailable", error?.message || error);
      }
    };

    askPermissions();
  }, []);

  return location;
};

export default useLocation;
