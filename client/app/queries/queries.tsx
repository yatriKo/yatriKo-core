import instance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

type hotelSearchData = {
  id: number;
  name: string;
  location: string;
  image: string;
  phoneNumber: string;
};

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
