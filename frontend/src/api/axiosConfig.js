import axios from "axios";

const API = axios.create({
  // Use an environment variable, or paste your Render backend URL here
  baseURL: process.env.REACT_APP_API_URL || "https://your-backend-name.onrender.com/api/",
});

// 🔐 attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
