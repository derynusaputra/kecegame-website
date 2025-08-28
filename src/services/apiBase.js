import axios from "axios";

const axiosInstatance = (baseURL, token) => {
  const headers = {};

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL,
    headers,
    timeout: 12000,
  });
};

export const apiBase = (token) => {
  console.log("token", token);

  const API_URL = "https://api.halalinmu.com";
  const API_URLs = "https://d58b88291335.ngrok-free.app";
  const API_URL_LOCAL = "http://localhost:3000";

  return axiosInstatance(API_URL, token);
};
