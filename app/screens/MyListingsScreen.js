import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import AppCard from "../components/AppCard";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import colors from "../config/colors";

function MyListingsScreen({ navigation }) {
  const getMyListingsApi = useApi(listingsApi.getMyListings);

  useEffect(() => {
    getMyListingsApi.request();
  }, []);

  const handleRefresh = useCallback(() => {
    getMyListingsApi.request();
  }, [getMyListingsApi]);

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={getMyListingsApi.loading} />
      {getMyListingsApi.error && (
        <View style={styles.centered}>
          <AppText style={styles.muted}>
            Couldn&apos;t load your listings.
          </AppText>
          <AppButton title="Try again" onPress={handleRefresh} />
        </View>
      )}
      {!getMyListingsApi.error &&
        !getMyListingsApi.loading &&
        (!getMyListingsApi.data || getMyListingsApi.data.length === 0) && (
          <View style={styles.centered}>
            <AppText style={styles.title}>No listings yet</AppText>
            <AppText style={styles.muted}>
              Post an item from the + tab and it will appear here.
            </AppText>
          </View>
        )}
      <FlatList
        data={getMyListingsApi.data || []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshing={getMyListingsApi.loading}
        onRefresh={handleRefresh}
        renderItem={({ item: listing }) => (
          <AppCard
            imageUrl={
              listing?.images?.[0]?.url ||
              require("../assets/placeholder-image.png")
            }
            title={listing.title}
            subTitle={`$${listing.price}`}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, listing)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
  },
  list: {
    paddingBottom: 30,
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

export default MyListingsScreen;
