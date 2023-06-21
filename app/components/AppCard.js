import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AppText from "./AppText";

import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";

function AppCard({ imageUrl, title, subTitle, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          uri={imageUrl}
          preview={{ uri: imageUrl }}
        ></Image>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          {title && <AppText>{subTitle}</AppText>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  subtitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default AppCard;
