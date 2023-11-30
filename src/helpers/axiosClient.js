import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_APIURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
