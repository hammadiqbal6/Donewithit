import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetails from "../screens/ListingDetails";
import colors from "../config/colors";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: colors.primary,
      headerTitleStyle: { fontWeight: "600" },
      cardStyle: { backgroundColor: colors.white },
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
