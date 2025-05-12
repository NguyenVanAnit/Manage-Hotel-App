import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "http://192.168.0.103:9192",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;