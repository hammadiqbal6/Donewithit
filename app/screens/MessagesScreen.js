import { FlatList, View } from "react-native";
import {
  ListItem,
  ListItemSeparator,
  ListItemDeleteAction,
} from "../components/lists";
import { useEffect, useState } from "react";

function MessagesScreen(props) {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setMessages([
      {
        id: 1,
        title: "abvasdadasdasdasdasdasdadasdasdasdasdasdasdasdasdasdasdasd",
        description:
          "abasdasdasdasdasdasdasdasdadasdasdasdasdasdasdasdadasdasdasdasdsc",
        image: require("../assets/jacket.jpg"),
      },
      {
        id: 2,
        title: "abv",
        description: "abc",
        image: require("../assets/mosh.jpg"),
      },
      {
        id: 3,
        title: "abv",
        description: "abc",
        image: require("../assets/mosh.jpg"),
      },
      {
        id: 4,
        title: "abv",
        description: "abc",
        image: require("../assets/jacket.jpg"),
      },
    ]);
  }, []);
  const handleOnPress = () => {};
  const handleOnDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };
  return (
    <FlatList
      data={messages}
      keyExtractor={(message) => message.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subTitle={item.description}
          image={item.image}
          // icon={{ name: "trash-can", color: "black" }}
          onPress={handleOnPress}
          renderRightActions={() => (
            <ListItemDeleteAction onPress={() => handleOnDelete(item)} />
          )}
        />
      )}
      ItemSeparatorComponent={ListItemSeparator}
      refreshing={refreshing}
      onRefresh={() => {
        setMessages([
          {
            id: 3,
            title: "abv",
            description: "abc",
            image: require("../assets/mosh.jpg"),
          },
          {
            id: 4,
            title: "abv",
            description: "abc",
            image: require("../assets/jacket.jpg"),
          },
        ]);
      }}
    />
  );
}

export default MessagesScreen;
