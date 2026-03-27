import axios from "axios";

const envUrl = import.meta.env.VITE_AUTH_API_URL;
const baseURL =
  envUrl && envUrl.trim().length > 0 ? envUrl.trim() : "http://localhost:3000";

const authApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token if present.
authApi.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ?? localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const skipLog = Boolean((error as any)?.config?.skipGlobalErrorLog);
    if (skipLog) {
      return Promise.reject(error);
    }
    if (error.response) {
      console.error("Error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server");
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default authApi;
