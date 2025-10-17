import { useQuery, useQueryClient } from "@tanstack/react-query";
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

export const checkStatusDelivery = {
  get: () => {
    return useQuery({
      queryKey: ["checkStatusDelivery"],
      queryFn: async (refId) => {
        try {
          const res = await apiBase().get(
            `/v1/game-payment/check-status/${refId}`
          );
          return res;
        } catch (error) {
          console.log(error);
        }
      },
      enabled: false,
    });
  },
};

export const checkStatuss = () => {
  const queryClient = useQueryClient();

  const get = async (refId) => {
    const { data } = await apiBase().get(
      `/v1/game-payment/check-status/${refId}`
    );
    queryClient.setQueryData(["checkStatuss", refId], data);
    queryClient.invalidateQueries({ queryKey: ["getListTransaction"] });
    return data;
  };

  return { get };
};
