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

export type IndividualBus = {
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
};

interface UploadFileResponse {
  url: string;
}

type BusInfo = {
  from: string;
  image: Array<string>;
  to: string;
  date: string;
  busNumber: string;
  phoneNumber: string;
  busSeats: Array<{
    seatType: string;
    price: number;
    numberOfSeats: number;
  }>;
};

export const useGetBus = () => {
  const data = useQuery<AxiosResponse<Bus>, Error>({
    queryKey: ["getBus"],
    queryFn: async () => {
      return await instance.get("/bus");
    },
  });

  return data;
};

export const useGetIndividualBus = (id: string) => {
  const data = useQuery<AxiosResponse<IndividualBus, string>, Error>({
    queryKey: ["getIndividualBus", id],
    queryFn: async () => {
      return await instance.get(`/bus/${id}`);
    },
  });

  return data;
};

export const useDeleteBus = () => {
  const data = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`/bus/${id}`);
    },
  });
  return data;
};

export const useUploadBusImage = () => {
  return useMutation<UploadFileResponse, AxiosError, FormData>({
    mutationFn: async (val: FormData) => {
      const { data } = await instance.post("/bus/bus-image", val, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
  });
};

export const useUploadBusInfo = () => {
  return useMutation({
    mutationFn: async (busInfo: BusInfo) => {
      const { data } = await instance.post("/bus", busInfo);
      return data;
    },
  });
};
