import { Image, StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { ListItem } from "../components/lists";

function ListingDetails(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/jacket.jpg")} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>Title</AppText>
        <AppText style={styles.price}>SubTitle</AppText>
      </View>
      <ListItem
        image={require("../assets/mosh.jpg")}
        title="place holder"
        subTitle="place holder"
      />
    </View>
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
