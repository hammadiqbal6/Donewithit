import {
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import AppCard from "../components/AppCard";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";

function ListingsScreen() {
  const navigation = useNavigation();
  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  const handleRefresh = useCallback(() => {
    getListingsApi.request();
  }, [getListingsApi]);

  const openListing = (listing) => {
    navigation.navigate(routes.LISTING_DETAILS, listing);
  };

  const listings = getListingsApi.data || [];

  return (
    <Screen style={styles.container}>
      {getListingsApi.loading && listings.length === 0 && (
        <ActivityIndicator visible />
      )}
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
        listings.length === 0 && (
          <View style={styles.emptyContainer}>
            <AppText style={styles.emptyTitle}>No listings yet</AppText>
            <AppText style={styles.emptySubtitle}>
              Be the first to post something for sale.
            </AppText>
          </View>
        )}
      <ScrollView
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={getListingsApi.loading && listings.length > 0}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {listings.map((listing) => (
          <Pressable
            key={listing.id.toString()}
            onPress={() => openListing(listing)}
            accessibilityRole="button"
            accessibilityLabel={`${listing.title} $${listing.price}`}
          >
            <AppCard
              imageUrl={
                listing?.images?.[0]?.url ||
                require("../assets/placeholder-image.png")
              }
              title={listing.title}
              subTitle={`$${listing.price}`}
              onPress={() => openListing(listing)}
            />
          </Pressable>
        ))}
      </ScrollView>
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
