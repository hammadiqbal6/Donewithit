import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  ListItem,
  ListItemSeparator,
  ListItemDeleteAction,
} from "../components/lists";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import messagesApi from "../api/messages";
import colors from "../config/colors";

function MessagesScreen() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    const response = await messagesApi.getMessages();
    setLoading(false);
    setError(!response.ok);
    if (response.ok) setMessages(response.data || []);
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleOnDelete = (message) => {
    setMessages((current) => current.filter((m) => m.id !== message.id));
  };

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading && messages.length === 0} />
      {error && (
        <View style={styles.centered}>
          <AppText style={styles.muted}>Couldn&apos;t load messages.</AppText>
          <AppButton title="Try again" onPress={loadMessages} />
        </View>
      )}
      {!error && !loading && messages.length === 0 && (
        <View style={styles.centered}>
          <AppText style={styles.title}>No messages yet</AppText>
          <AppText style={styles.muted}>
            When buyers contact you about a listing, messages show up here.
          </AppText>
        </View>
      )}
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.fromUser?.name || "Buyer"}
            subTitle={item.content}
            image={require("../assets/mosh.jpg")}
            onPress={() => {}}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleOnDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={loading}
        onRefresh={loadMessages}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  centered: {
    padding: 30,
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
  },
  muted: {
    color: colors.medium,
    textAlign: "center",
    marginBottom: 12,
  },
});

export default MessagesScreen;
