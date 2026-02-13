import axios from "axios";

const envUrl = import.meta.env.VITE_API_URL;
const baseURL =
  envUrl && envUrl.trim().length > 0
    ? envUrl.trim()
    : "http://localhost:3000/equipments";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Attach Token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor (Global Error Handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error("Error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server");
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
