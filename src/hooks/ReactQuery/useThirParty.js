import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "https://api.halalinmu.com";

export const useThirParty = {
  // 🔹 GET
  get: () => {
    return useQuery({
      queryKey: ["thirdparty"],
      queryFn: async () => {
        const res = await fetch(API_URL + "/v1/thirdparty/keys");
        if (!res.ok) throw new Error("Gagal fetch users");
        return res.json();
      },
    });
  },

  // 🔹 CREATE
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (newUser) => {
        const res = await fetch(API_URL + "/v1/thirdparty", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
        return res.json();
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
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });
        return res.json();
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
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["thirdparty"] });
      },
    });
  },
};
