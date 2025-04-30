import instance from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

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
      const response = await instance.get(`/hotel/${id}`);
      return response.data;
    },
  });
};

export const useGetRooms = (id: number, from: Date | null, to: Date | null) => {
  const checkIn = dayjs(from).format("DD/MM/YYYY");
  const checkOut = dayjs(to).format("DD/MM/YYYY");
  return useQuery({
    queryKey: [id, from, to],
    queryFn: async () => {
      const response = await instance.get(`/hotel/${id}/rooms`, {
        params: { from: checkIn, to: checkOut },
      });
      return response.data;
    },
    enabled: !!from && !!to,
  });
};

export const useBookHotel = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const checkIn = dayjs(data.from).format("DD/MM/YYYY");
      const checkOut = dayjs(data.to).format("DD/MM/YYYY");
      const response = await instance.post("/booking-hotel", {
        roomId: data.roomId,
        dateFrom: checkIn,
        dateTo: checkOut,
      });
      return response;
    },
  });
};

export const useGetBusDetails = (id: number) => {
  return useQuery({
    queryKey: [id, "bus"],
    queryFn: async () => {
      const response = await instance.get(`/bus/${id}`);
      return response.data;
    },
  });
};

export const useGetSeats = (id: number) => {
  return useQuery({
    queryKey: [id, "seats"],
    queryFn: async () => {
      const response = await instance.get(`/bus/${id}/seats`);
      return response.data;
    },
  });
};

export const useBookBus = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await instance.post("/booking-bus", {
        busSeatId: id,
      });
      return response;
    },
  });
};

export const useGetHotelBookings = () => {
  return useQuery({
    queryFn: async () => {
      const response = await instance.get("/booking-hotel");
      return response.data;
    },
    queryKey: ["hotelBookings"],
  });
};

export const useGetBusBookings = () => {
  return useQuery({
    queryFn: async () => {
      const response = await instance.get("/booking-bus");
      return response.data;
    },
    queryKey: ["busBookings"],
  });
};
