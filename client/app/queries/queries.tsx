import instance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useHotelSearch = (search: string | null) => {
  return useQuery({
    queryKey: [search, "hotel"],
    queryFn: async () => {
      const response = await instance.get(
        `/hotel${search ? `?search=${search}` : ""}`
      );
      return response.data;
    },
  });
};

export const useBusSearch = (search: string | null) => {
  return useQuery({
    queryKey: [search, "bus"],
    queryFn: async () => {
      const response = await instance.get(
        `/bus${search ? `?search=${search}` : ""}`
      );
      return response.data;
    },
  });
};
