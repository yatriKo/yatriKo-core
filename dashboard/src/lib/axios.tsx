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
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = parsedToken?.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
