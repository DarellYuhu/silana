import axiosClient from "./axiosClient";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
const postJwtLogin = (data) => axiosClient.post("auth/login", data);

export { getLoggedInUser, isUserAuthenticated, postJwtLogin };
