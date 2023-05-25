import { FlatList, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppCard from "../components/AppCard";
import colors from "../config/colors";

const listings = [
  {
    id: 1,
    title: "abc",
    price: 200,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "abc",
    price: 200,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 3,
    title: "abc",
    price: 200,
    image: require("../assets/jacket.jpg"),
  },
];

function ListingsScreen(props) {
  return (
    <Screen style={styles.container}>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item: listing }) => (
          <AppCard
            image={listing.image}
            title={listing.title}
            subTitle={`$${listing.price}`}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
