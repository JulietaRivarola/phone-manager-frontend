import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8082/api/',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("token:", config.headers.Authorization)
  }
  return config;
});

export default axiosInstance;
