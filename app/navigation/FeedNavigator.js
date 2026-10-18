import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetails from "../screens/ListingDetails";

const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Listings"
      component={ListingsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetails}
      options={{
        presentation: "modal",
        title: "Listing",
      }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
