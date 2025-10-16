import { useQuery } from "@tanstack/react-query";
import { apiBase } from "../apiBase";

export const getListCategory = () =>
  useQuery({
    queryKey: ["getListCategory"],
    queryFn: async () => {
      try {
        const res = await apiBase().get(`/v1/game-category`);
        return res?.data?.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
