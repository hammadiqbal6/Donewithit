import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useCallback, useEffect } from "react";

import Screen from "../components/Screen";
import AppCard from "../components/AppCard";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  const handleRefresh = useCallback(() => {
    getListingsApi.request();
  }, [getListingsApi]);

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={getListingsApi.loading} />
      {getListingsApi.error && (
        <View style={styles.errorContainer}>
          <AppText style={styles.errorText}>
            Couldn&apos;t load listings. Check that the API is running.
          </AppText>
          <AppButton title="Try again" onPress={handleRefresh} />
        </View>
      )}
      {!getListingsApi.error &&
        !getListingsApi.loading &&
        (!getListingsApi.data || getListingsApi.data.length === 0) && (
          <View style={styles.emptyContainer}>
            <AppText style={styles.emptyTitle}>No listings yet</AppText>
            <AppText style={styles.emptySubtitle}>
              Be the first to post something for sale.
            </AppText>
          </View>
        )}
      <FlatList
        data={getListingsApi.data || []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={getListingsApi.loading}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item: listing }) => (
          <AppCard
            imageUrl={
              listing?.images?.[0]?.url ||
              require("../assets/placeholder-image.png")
            }
            title={listing.title}
            subTitle={`$${listing.price}`}
            onPress={() =>
              navigation.navigate(routes.LISTING_DETAILS, listing)
            }
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.light,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 30,
    ...Platform.select({
      web: {
        maxWidth: 760,
        width: "100%",
        alignSelf: "center",
      },
    }),
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    marginBottom: 10,
    color: colors.medium,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: colors.medium,
    textAlign: "center",
  },
});

export default ListingsScreen;
