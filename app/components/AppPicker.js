import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import AppText from "./AppText";
import { useState } from "react";
import Screen from "./Screen";
import PickerItem from "./PickerItem";

function AppPicker({
  selectedItem,
  onSelectItem,
  PickerItemComponent = PickerItem,
  numberOfColumns = 1,
  icon,
  items,
  placeholder,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={defaultStyles.text}>{selectedItem.name}</AppText>
          ) : (
            <AppText>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            style={styles.chevron}
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="fade">
        <Screen>
          <Button title="close" onPress={() => setModalVisible(false)}></Button>
          <FlatList
            data={items}
            numColumns={numberOfColumns}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: category }) => (
              <PickerItemComponent
                item={category}
                onPress={() => {
                  console.log(category);
                  setModalVisible(false);
                  onSelectItem(category);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  placeholder: {
    color: defaultStyles.colors.medium,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppPicker;
