// src/utils/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // Adjust if needed
});

export default axiosInstance;

// `${import.meta.env.NEXT_PUBLIC_API_BASE_URL}/api`
