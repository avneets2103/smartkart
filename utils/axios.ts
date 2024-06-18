import { BACKEND_URI } from "@/CONSTANTS";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: `${BACKEND_URI}`, // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to set the Authorization header with the JWT token
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");  
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
