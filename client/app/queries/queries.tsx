import instance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useHotelSearch = (search: string | null) => {
  return useQuery({
    queryKey: [search, "hotel"],
    queryFn: async () => {
      const response = await instance.get("/hotel", {
        params: search ? { search } : {},
      });
      return response.data;
    },
  });
};

export const useBusSearch = (search: string | null) => {
  return useQuery({
    queryKey: [search, "bus"],
    queryFn: async () => {
      const response = await instance.get("/bus", {
        params: search ? { search } : {},
      });
      return response.data;
    },
  });
};

export const useGetHotelDetails = (id: number) => {
  return useQuery({
    queryKey: [id, "hotel"],
    queryFn: async () => {
      const response = await instance.get(`/hotel/5`);
      return response.data;
    },
  });
};
