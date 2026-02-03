import axios from "axios";

const apiClient = axios.create({
  // Your live Render URL
  baseURL: "https://my-blogging-api.onrender.com",
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
