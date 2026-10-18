import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "../Icon";

function ListItem({
  image,
  icon,
  title,
  subTitle,
  onPress,
  renderRightActions,
}) {
  const content = (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      style={styles.container}
    >
      {image && <Image style={styles.image} source={image} />}
      {icon && (
        <Icon
          name={icon.name}
          backgroundColor={icon.backgroundColor}
          iconColor={icon.iconColor}
          size={icon.size}
        />
      )}
      <View style={styles.detailsContainer}>
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        {subTitle && (
          <AppText style={styles.subtitle} numberOfLines={2}>
            {subTitle}
          </AppText>
        )}
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={25}
        color={colors.medium}
      />
    </TouchableOpacity>
  );

  if (Platform.OS === "web" || !renderRightActions) {
    return content;
  }

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>{content}</Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: colors.white,
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
  detailsContainer: {
    marginVertical: 10,
    justifyContent: "center",
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.medium,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default ListItem;
