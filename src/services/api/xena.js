import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const postChapta = () =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await axios.post(
          "https://agency.xenalive.me/api/messageCaptcha",
          body,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
            },
          }
        );

        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });

export const postLoginChapta = () =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await axios.post(
          "https://agency.xenalive.me/api/login",
          body,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
            },
          }
        );

        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });
