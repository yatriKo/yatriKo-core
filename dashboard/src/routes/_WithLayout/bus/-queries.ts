import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../../../lib/axios";
import { AxiosError, AxiosResponse } from "axios";

export type Bus = Array<{
  id: number;
  dashboardUserId: number;
  from: string;
  image: Array<string>;
  to: string;
  date: string;
  busNumber: string;
  phoneNumber: string;
  busSeats: Array<{
    id: number;
    busId: number;
    seatType: string;
    price: number;
  }>;
}>;

export type IndividualHotel = {
  id: number;
  name: string;
  dashboardUserId: number;
  location: string;
  phoneNumber: string;
  image: Array<string>;
  rooms: Array<{
    id: number;
    hotelId: number;
    roomType: string;
    image: Array<any>;
    price: number;
  }>;
};

interface UploadFileResponse {
  url: string;
}

type HotelInfo = {
  name: string;
  location: string;
  phoneNumber: string;
  hotelImage: string[];
  roomType: (
    | { price: number; numberOfRoom: number; type: string }
    | { price: number; numberOfRoom: number; type: string }
    | { price: number; numberOfRoom: number; type: string }
  )[];
};

export const useGetBus = () => {
  const data = useQuery<AxiosResponse<Bus>, Error>({
    queryKey: ["getHotel"],
    queryFn: async () => {
      return await instance.get("/bus");
    },
  });

  return data;
};

export const useGetIndividualHotel = (id: string) => {
  const data = useQuery<AxiosResponse<IndividualHotel, string>, Error>({
    queryKey: ["getIndividualHotel", id],
    queryFn: async () => {
      return await instance.get(`/bus/${id}`);
    },
  });

  return data;
};

export const useDeleteHotel = () => {
  const data = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`/bus/${id}`);
    },
  });
  return data;
};

export const useUploadHotelImage = () => {
  return useMutation<UploadFileResponse, AxiosError, FormData>({
    mutationFn: async (val: FormData) => {
      const { data } = await instance.post("/bus/bus-image", val, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
  });
};

export const useUploadHotelInfo = () => {
  return useMutation({
    mutationFn: async (hotelInfo: HotelInfo) => {
      const { data } = await instance.post("/bus", hotelInfo);
      return data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["getHotel"] });
    // },
  });
};
