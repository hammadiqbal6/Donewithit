import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const getMyListings = () => client.get("/my/listings");

export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.id);
  data.append("description", listing.description || "");

  listing.images.forEach((image, index) => {
    if (typeof image === "string" && image.startsWith("data:")) {
      data.append("images", {
        name: `image${index}.jpg`,
        type: "image/jpeg",
        uri: image,
      });
    } else {
      data.append("images", {
        name: `image${index}.jpg`,
        type: "image/jpeg",
        uri: image,
      });
    }
  });

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progressEvent) => {
      if (!onUploadProgress || !progressEvent.total) return;
      onUploadProgress(progressEvent.loaded / progressEvent.total);
    },
  });
};

export default {
  addListing,
  getListings,
  getMyListings,
};
