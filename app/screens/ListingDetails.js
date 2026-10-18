import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as Yup from "yup";

import AppText from "../components/AppText";
import colors from "../config/colors";
import { ListItem } from "../components/lists";
import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import usersApi from "../api/users";
import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

function ListingDetails({ route }) {
  const listing = route.params;
  const { user } = useAuth();
  const [seller, setSeller] = useState(null);
  const [sendFailed, setSendFailed] = useState(false);
  const [sendSucceeded, setSendSucceeded] = useState(false);

  useEffect(() => {
    const loadSeller = async () => {
      if (!listing?.userId) return;
      const response = await usersApi.getUser(listing.userId);
      if (response.ok) setSeller(response.data);
    };
    loadSeller();
  }, [listing?.userId]);

  const handleSubmit = async ({ message }, { resetForm }) => {
    setSendFailed(false);
    setSendSucceeded(false);
    const result = await messagesApi.send(listing.id, message);
    if (!result.ok) {
      setSendFailed(true);
      return;
    }
    setSendSucceeded(true);
    resetForm();
  };

  const imageUri = listing?.images?.[0]?.url;

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Image
            style={styles.image}
            source={
              imageUri
                ? { uri: imageUri }
                : require("../assets/placeholder-image.png")
            }
          />
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{listing.title}</AppText>
            <AppText style={styles.price}>${listing.price}</AppText>
            {listing.description ? (
              <AppText style={styles.description}>
                {listing.description}
              </AppText>
            ) : null}
          </View>

          <View style={styles.sellerContainer}>
            <ListItem
              image={require("../assets/mosh.jpg")}
              title={seller?.name || "Seller"}
              subTitle={
                seller
                  ? `${seller.listings} listing${
                      seller.listings === 1 ? "" : "s"
                    }`
                  : "Loading seller..."
              }
            />
          </View>

          {user?.userId !== listing.userId && (
            <View style={styles.contactContainer}>
              <AppText style={styles.contactTitle}>Contact seller</AppText>
              <AppForm
                initialValues={{ message: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <ErrorMessage
                  error="Could not send the message."
                  visible={sendFailed}
                />
                {sendSucceeded && (
                  <AppText style={styles.success}>Message sent!</AppText>
                )}
                <AppFormField
                  name="message"
                  placeholder="Is this still available?"
                  multiline
                  numberOfLines={3}
                />
                <SubmitButton title="Contact Seller" />
              </AppForm>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
    ...Platform.select({
      web: {
        maxWidth: 760,
        width: "100%",
        alignSelf: "center",
      },
    }),
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: colors.light,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 7,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
  },
  description: {
    color: colors.medium,
    lineHeight: 22,
  },
  sellerContainer: {
    marginBottom: 10,
  },
  contactContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  contactTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },
  success: {
    color: colors.secondary,
    marginBottom: 8,
    fontWeight: "600",
  },
});

export default ListingDetails;
