import { apiBase } from "@/services/apiBase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProduct = {
  // 🔹 GET
  get: () => {
    return useQuery({
      queryFn: async (brandId) => {
        const { data } = await apiBase().get(
          `/v1/game-product/:${brandId ?? ""}`
        );

        return data;
      },
      queryKey: ["useProduct"],
    });
  },

  // 🔹 CREATE
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (brandId) => {
        const { data } = await apiBase().post("/v1/game-product", {
          brand: brandId ?? "",
        });

        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["useProduct"] });
      },
    });
  },

  // 🔹 UPDATE
  // update: () => {
  //   const queryClient = useQueryClient();
  //   return useMutation({
  //     mutationFn: async ({ id, ...updatedUser }) => {
  //       const { data } = await apiBase().put(
  //         `/v1/thirdparty/${id}`,
  //         updatedUser
  //       );
  //       return data;
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["useProduct"] });
  //     },
  //   });
  // },

  // 🔹 DELETE
  // delete: () => {
  //   const queryClient = useQueryClient();
  //   return useMutation({
  //     mutationFn: async (id) => {
  //       const { data } = await apiBase().delete(`/v1/thirdparty/${id}`);
  //       return data;
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["useProduct"] });
  //     },
  //   });
  // },
};
