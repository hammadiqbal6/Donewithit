import { FlatList, StyleSheet, View } from "react-native";
import { ListItem, ListItemSeperator } from "../components/lists";
import Screen from "../components/Screen";
import colors from "../config/colors";

const menuItems = [
  {
    title: "My Listings",
    icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
  },
];

function AccountScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <ListItem
          title="hammad iqbal"
          subTitle="SSE"
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index}
          renderItem={({ item: menuItem }) => (
            <ListItem title={menuItem.title} icon={menuItem.icon} />
          )}
          ItemSeparatorComponent={ListItemSeperator}
        />
      </View>
      <View>
        <ListItem
          title="Logout"
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
