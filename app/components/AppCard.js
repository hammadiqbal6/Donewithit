import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function CardImage({ imageUrl, style }) {
  const uri = typeof imageUrl === "string" ? imageUrl : null;
  const source = uri ? { uri } : imageUrl;

  if (Platform.OS !== "web" && uri) {
    try {
      const { Image: CachedImage } = require("react-native-expo-image-cache");
      return (
        <CachedImage style={style} uri={uri} preview={{ uri }} tint="light" />
      );
    } catch (error) {
      // Fall through to standard Image.
    }
  }

  return <Image style={style} source={source} />;
}

function AppCard({ imageUrl, title, subTitle, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      onClick={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <CardImage imageUrl={imageUrl} style={styles.image} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title} numberOfLines={2}>
          {title}
        </AppText>
        {subTitle ? <AppText style={styles.subtitle}>{subTitle}</AppText> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    ...Platform.select({
      web: {
        boxShadow: "0 8px 24px rgba(12, 12, 12, 0.08)",
        maxWidth: 720,
        alignSelf: "center",
        cursor: "pointer",
      },
      default: {
        elevation: 1,
      },
    }),
  },
  pressed: {
    opacity: 0.92,
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
    color: colors.dark,
  },
  subtitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default AppCard;
