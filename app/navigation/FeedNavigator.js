import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetails from "../screens/ListingDetails";

const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "#fc5c65",
      contentStyle: { backgroundColor: "#fff" },
    }}
  >
    <Stack.Screen
      name="Listings"
      component={ListingsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetails}
      options={{ title: "Listing" }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
