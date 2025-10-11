import { useQuery } from "@tanstack/react-query";

export const getListTransaction = () =>
  useQuery({
    queryKey: ["getListTransaction"],
    queryFn: () => apiBase().get("/v1/game-banner"),
  });
