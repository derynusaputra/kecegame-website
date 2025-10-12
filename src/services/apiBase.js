import axios from "axios";
import { configEnv } from "./config";

const axiosInstatance = (baseURL, token) => {
  const headers = {};

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL,
    headers,
    timeout: 12000,
    // withCredentials: true,
  });
};

// export const API_URL = "https://api.itmerdeka.id";
// export const API_URLs = "https://api.itmerdeka.id";
// export const API_URLss = "https://d58b88291335.ngrok-free.app";
// export const API_URL = "http://localhost:3000";
export const apiBase = (token) => {
  return axiosInstatance(configEnv.baseUrl, token);
};
