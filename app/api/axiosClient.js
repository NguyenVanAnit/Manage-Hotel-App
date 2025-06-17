import axios from 'axios';

const axiosClient = axios.create({
  // baseURL: "http://192.168.0.103:9192",
  baseURL: "https://booking-hotel-backend-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;