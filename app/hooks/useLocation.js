import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState();
  const askPermissions = async () => {
    try {
      await Location.getBackgroundPermissionsAsync();
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        alert("we need the locations permission to make it work");
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log("error granting location permission");
    }
  };

  useEffect(() => {
    askPermissions();
  }, []);

  return location;
};

export default useLocation;
