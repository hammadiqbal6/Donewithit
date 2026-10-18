import client from "./client";

const endpoint = "/messages";

const getMessages = () => client.get(endpoint);

const send = (listingId, message) =>
  client.post(endpoint, { listingId, message });

export default { getMessages, send };
