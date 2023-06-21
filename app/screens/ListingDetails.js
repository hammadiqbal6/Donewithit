import { Image, StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { ListItem } from "../components/lists";
import Screen from "../components/Screen";

function ListingDetails({ route }) {
  const listing = route.params;
  return (
    <Screen>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: listing.images[0].url }} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{listing.title}</AppText>
          <AppText style={styles.price}>${listing.price}</AppText>
        </View>
        <ListItem
          image={require("../assets/mosh.jpg")}
          title="place holder"
          subTitle="place holder"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default ListingDetails;
