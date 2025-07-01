// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Example: https://code-multiverse-backend.onrender.com
  withCredentials: true, // ✅ Include cookies if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ Correct format
  }
  return config;
});

export default api;
