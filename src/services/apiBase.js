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

export const API_URL = "https://api.halalinmu.com";
// export const API_URLs = "https://api.halalinmu.com";
// export const API_URLss = "https://d58b88291335.ngrok-free.app";
// export const API_URL = "http://localhost:3000";
export const apiBase = (token) => {
  console.log("token", token);

  return axiosInstatance(API_URL, token);
};
