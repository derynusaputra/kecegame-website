import { useMutation, useQuery } from "@tanstack/react-query";
import { apiBase } from "../apiBase";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const getListBrand = () =>
  useQuery({
    queryKey: ["getListBrand"],
    queryFn: async () => {
      try {
        const res = await apiBase().get(`/v1/game-brand`);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });

export const putBrand = (id) =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await apiBase().put(`/v1/game-brand/${id}`, body);
        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });
export const putBrandById = () =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await apiBase().put(`/v1/game-brand/${body?.id}`, body);
        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });
export const postBrand = () =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await apiBase().post(`/v1/game-brand`, body);
        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });

export const getSyncCategoryBrand = (enabled) =>
  useQuery({
    queryKey: ["getSyncCategoryBrand", enabled],
    queryFn: async () => {
      try {
        const res = await apiBase().get(`/v1/game-category/sync`);
        toast.success("Sync successful ");
        return res;
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error?.data?.message);
        }
      }
    },
    enabled: enabled,
  });

export const postProductByBrand = () =>
  useMutation({
    mutationFn: async (body) => {
      try {
        const res = await apiBase().post(`/v1/game-product`, body);
        return res?.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw error.response;
        }
      }
    },
  });
