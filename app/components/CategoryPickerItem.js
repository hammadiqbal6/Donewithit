import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Icon from "./Icon";
import AppText from "./AppText";

function CategoryPickerItem({ item, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <View style={styles.container}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={50}
        />
        <AppText style={styles.text}>{item.name}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
});
export default CategoryPickerItem;
