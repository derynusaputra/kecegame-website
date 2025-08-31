import { apiBase } from "@/services/apiBase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCheckID = {
  // 🔹 GET
  // get: () => {
  //   return useQuery({
  //     queryKey: ["useCheckID"],
  //     queryFn: async () => {
  //       // This will be called when refetch is triggered
  //       return null; // Return null initially since we don't have userID yet
  //     },
  //     enabled: false, // Disable automatic fetching
  //   });
  // },

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
        queryClient.invalidateQueries({ queryKey: ["useCheckID"] });
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
  //       queryClient.invalidateQueries({ queryKey: ["useCheckID"] });
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
  //       queryClient.invalidateQueries({ queryKey: ["useCheckID"] });
  //     },
  //   });
  // },
};
