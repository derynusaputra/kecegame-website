import { useMutation, useQuery } from "@tanstack/react-query";
import { apiBase } from "../apiBase";

export const getAllProductOther = (brand) =>
  useQuery({
    queryKey: ["getAllProductOther", brand],
    queryFn: async () => {
      try {
        const res = await apiBase().get(
          `/v1/game-product-other?brand=${brand}`
        );
        return res;
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error?.data?.message);
        }
      }
    },
    enabled: !!brand,
  });

export const postProductOther = () =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await apiBase().post(`/v1/game-product-other`, body);
        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });
