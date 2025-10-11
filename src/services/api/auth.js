import { useMutation, useQuery } from "@tanstack/react-query";
import { apiBase } from "../apiBase";
import { isAxiosError } from "axios";

export const profile = () =>
  useMutation({
    mutationFn: async () => {
      try {
        const res = await apiBase().get("/v1/users/me");
        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });
