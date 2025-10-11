import { useMutation, useQuery } from "@tanstack/react-query";
import { apiBase } from "../apiBase";
import { isAxiosError } from "axios";

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
