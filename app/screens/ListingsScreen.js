import { Button, FlatList, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import AppCard from "../components/AppCard";
import colors from "../config/colors";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import { useEffect, useState } from "react";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <Screen style={styles.container}>
      {getListingsApi.error && (
        <>
          <Text>Error fetching listings</Text>
          <Button title="try again" onPress={getListingsApi.request} />
        </>
      )}
      {/* <ActivityIndicator visible={getListingsApi.loading} /> */}
      <FlatList
        data={getListingsApi.data}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={() => getListingsApi.data}
        renderItem={({ item: listing }) => (
          <AppCard
            imageUrl={
              listing?.images[0]?.url ??
              require("../assets/placeholder-image.png")
            }
            title={listing.title}
            subTitle={`$${listing.price}`}
            onPress={() => {
              // console.log(listing);
              navigation.navigate(routes.LISTING_DETAILS, listing);
            }}
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
});

export default ListingsScreen;
