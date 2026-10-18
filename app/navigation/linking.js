const linking = {
  prefixes: ["http://localhost:19006", "http://127.0.0.1:19006", "/"],
  config: {
    screens: {
      Welcome: "welcome",
      Login: "login",
      Register: "register",
      Feed: {
        path: "feed",
        screens: {
          Listings: "",
          ListingDetails: "listing",
        },
      },
      ListingEdit: "new",
      Account: {
        path: "account",
        screens: {
          Account: "",
          MyListings: "my-listings",
          Messages: "messages",
          ListingDetails: "listing",
        },
      },
    },
  },
};

export default linking;
