import { useMutation, useQuery } from "@tanstack/react-query";
import { apiBase } from "../apiBase";

export const getListBrand = () =>
  useQuery({
    queryKey: ["getListBrand"],
    queryFn: async () => {
      try {
        const res = await apiBase().get(`/v1/game-brand`);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });

export const putBrand = (id) =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await apiBase().put(`/v1/game-brand/${id}`, body);
        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });
