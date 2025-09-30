import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://rockfall-prediction-five.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
