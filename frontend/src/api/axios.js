import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: This automatically adds the token to every request
// so you don't have to manually add headers for protected routes.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
