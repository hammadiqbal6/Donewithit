import { Platform, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
  FormImagePicker,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listings";
import categoryApi from "../api/categories";
import useApi from "../hooks/useApi";
import UploadScreen from "../components/UploadScreen";
import AppText from "../components/AppText";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

function ListingEditScreen() {
  const location = useLocation();
  const getCategoriesApi = useApi(categoryApi.getCategories);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getCategoriesApi.request();
  }, []);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const result = await listingsApi.addListing(
      { ...listing, location },
      (value) => setProgress(value)
    );

    if (!result.ok) {
      setUploadVisible(false);
      alert(
        result.data?.error ||
          "Could not save the listing. Make sure you are logged in and the API is running."
      );
      return;
    }

    setProgress(1);
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        progress={progress}
        onDone={() => setUploadVisible(false)}
        visible={uploadVisible}
      />
      <View style={styles.inner}>
        <AppText style={styles.heading}>New listing</AppText>
        {getCategoriesApi.error && (
          <AppText style={styles.error}>
            Categories failed to load. Pull to reopen this screen after the API
            is up.
          </AppText>
        )}
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="Title" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />
          <Picker
            items={getCategoriesApi.data || []}
            name="category"
            placeholder="Category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Post" />
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  inner: {
    ...Platform.select({
      web: {
        maxWidth: 640,
        width: "100%",
        alignSelf: "center",
      },
    }),
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 4,
  },
  error: {
    color: colors.danger,
    marginBottom: 10,
  },
});

export default ListingEditScreen;
