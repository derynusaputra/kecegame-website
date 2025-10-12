import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { apiBase } from "../apiBase";

export const postLogin = () =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await apiBase().post("/v1/auth/login", body);

        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });
