import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesScreen from "../screens/MessagesScreen";
import AccountScreen from "../screens/AccountScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import ListingDetails from "../screens/ListingDetails";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="MyListings" component={MyListingsScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetails}
      options={{ title: "Listing" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
