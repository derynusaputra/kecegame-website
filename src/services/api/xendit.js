import { useMutation } from "@tanstack/react-query";
import { apiBase } from "../apiBase";

export const updateKey = (id) =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await apiBase().patch(`/v1/thirdparty/${id}`, body, {
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        });
        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });
