import { StyleSheet, View } from "react-native";
import { ListItem, ListItemSeparator } from "../components/lists";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
    targetScreen: routes.MY_LISTINGS,
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user?.name || "Account"}
          subTitle={user?.email}
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        {menuItems.map((menuItem, index) => (
          <View key={menuItem.title}>
            {index > 0 && <ListItemSeparator />}
            <ListItem
              title={menuItem.title}
              icon={menuItem.icon}
              onPress={() => navigation.navigate(menuItem.targetScreen)}
            />
          </View>
        ))}
      </View>
      <View>
        <ListItem
          onPress={logout}
          title="Log Out"
          icon={{ name: "logout", backgroundColor: colors.yellow }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
