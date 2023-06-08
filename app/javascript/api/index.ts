import axios, { AxiosInstance } from 'axios';

const apiInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${localStorage.getItem('token')}`,
  },
});

apiInstance.interceptors.request.use((config) => {
  return config;
});

apiInstance.interceptors.response.use((response) => {
  return response;
});

export default apiInstance