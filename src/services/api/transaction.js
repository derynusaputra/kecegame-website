import { useQuery } from "@tanstack/react-query";
import { apiBase } from "../apiBase";

export const getListTransaction = ({ page = 1, limit = 10, search = "" }) =>
  useQuery({
    queryKey: ["getListTransaction", search, page],
    queryFn: async () => {
      try {
        const res = await apiBase().get(
          `/v1/game-transaction/?page=${page}&limit=${limit}&search=${search}`
        );
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
