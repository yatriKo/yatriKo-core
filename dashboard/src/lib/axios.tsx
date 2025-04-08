import axios from "axios";

const defaultOptions = {
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("yatriKoToken");
    console.log(token);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
