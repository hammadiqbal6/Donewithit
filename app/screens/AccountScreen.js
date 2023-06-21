import { FlatList, StyleSheet, View } from "react-native";
import { ListItem, ListItemSeparator } from "../components/lists";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
    targetScreem: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <Screen>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index}
          renderItem={({ item: menuItem }) => (
            <ListItem
              title={menuItem.title}
              icon={menuItem.icon}
              onPress={() => navigation.navigate(menuItem.targetScreem)}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
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
  container: {
    marginBottom: 10,
  },
});

export default AccountScreen;
