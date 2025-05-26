
import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.cocobank.com' // Replace with your production API URL
  : 'http://localhost:5000'; // Default development server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add a longer timeout to prevent quick network errors
  timeout: 10000,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (e.g., token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      // Redirect to login page if needed
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
