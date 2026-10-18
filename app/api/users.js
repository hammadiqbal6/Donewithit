import client from "./client";

const register = (userInfo) => client.post("/users", userInfo);

const getUser = (id) => client.get(`/user/${id}`);

export default { register, getUser };
