import { apiBase } from "@/services/apiBase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useBrand = {
  // 🔹 GET
  get: () => {
    return useQuery({
      queryFn: async () => {
        const { data } = await apiBase().get("/v1/game-brand");
        console.log("data", data);

        return data;
      },
      queryKey: ["useBrand"],
    });
  },

  // 🔹 CREATE
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userID) => {
        const { data } = await apiBase().post(
          "/v1/game/check-profile-litmatch",
          { target_uid: userID ?? "" }
        );
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["useBrand"] });
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
  //       queryClient.invalidateQueries({ queryKey: ["useBrand"] });
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
  //       queryClient.invalidateQueries({ queryKey: ["useBrand"] });
  //     },
  //   });
  // },
};
