import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') + '/api';
console.log('Configured baseURL:', baseUrl);

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(new Error(error.response.data.message || 'Something went wrong'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;