import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import AccountScreen from "../screens/AccountScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import ListingDetails from "../screens/ListingDetails";
import colors from "../config/colors";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: colors.primary,
      headerTitleStyle: { fontWeight: "600" },
      cardStyle: { backgroundColor: colors.light },
    }}
  >
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen
      name="MyListings"
      component={MyListingsScreen}
      options={{ title: "My Listings" }}
    />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetails}
      options={{ title: "Listing" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
