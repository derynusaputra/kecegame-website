import { apiBase } from "@/services/apiBase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useThirParty = {
  // 🔹 GET
  get: () => {
    return useQuery({
      queryKey: ["thirdparty"],
      queryFn: async () => {
        const { data } = await apiBase().get("/v1/thirdparty/keys");
        console.log("data", data);

        return data;
      },
    });
  },

  // 🔹 CREATE
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (newUser) => {
        const { data } = await apiBase().post("/v1/thirdparty", newUser);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["thirdparty"] });
      },
    });
  },

  // 🔹 UPDATE
  update: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, ...updatedUser }) => {
        const { data } = await apiBase().put(
          `/v1/thirdparty/${id}`,
          updatedUser
        );
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["thirdparty"] });
      },
    });
  },

  // 🔹 DELETE
  delete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id) => {
        const { data } = await apiBase().delete(`/v1/thirdparty/${id}`);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["thirdparty"] });
      },
    });
  },
};
