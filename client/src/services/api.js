import axios from "axios";

/**
 * api — pre-configured axios instance.
 * All service modules import this instead of raw axios so base URL
 * and error handling are applied consistently.
 */
const api = axios.create({
  baseURL: "/api",           // Vite proxy forwards /api → http://localhost:5000
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor — unwrap { success, data } envelope
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

export default api;
