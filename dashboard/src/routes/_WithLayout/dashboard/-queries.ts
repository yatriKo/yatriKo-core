import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../../../lib/axios";
import { AxiosResponse } from "axios";

export type bookings = Array<{
  id: number;
  roomId: number;
  userId: number;
  travelerAgentId: any;
  dateFrom: string;
  dateTo: string;
  paymentStatus: boolean;
  room: {
    id: number;
    hotelId: number;
    roomType: string;
    image: Array<any>;
    price: number;
    hotel: {
      id: number;
      name: string;
      dashboardUserId: number;
      location: string;
      phoneNumber: string;
      image: Array<string>;
    };
  };
  user: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  };
  travelerAgent: any;
}>;

type busBooking = Array<{
  id: number;
  userId: number;
  travelerAgentId: any;
  busSeatId: number;
  date: string;
  paymentStatus: boolean;
  BusSeat: {
    id: number;
    busId: number;
    seatType: string;
    price: number;
    bus: {
      id: number;
      dashboardUserId: number;
      from: string;
      image: Array<string>;
      to: string;
      date: string;
      busNumber: string;
      phoneNumber: string;
    };
  };
  user: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  };
  travelerAgent: any;
}>;

// fetch all the booking detail of the hotel
export const useGetDashboardDetail = () => {
  const data = useQuery<AxiosResponse<bookings, string>, Error>({
    queryKey: ["bookings"],
    queryFn: async () => {
      return await instance.get(`/booking/hotel`);
    },
  });

  return data;
};

// fetch all the booking detail of the bus
export const useGetDashboardDetailBus = () => {
  const data = useQuery<AxiosResponse<busBooking, string>, Error>({
    queryKey: ["busBooking"],
    queryFn: async () => {
      return await instance.get(`/booking/bus`);
    },
  });

  return data;
};

// delete the hotel's booking
export const useDeleteBooking = () => {
  const data = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`/booking/hotel/${id}`);
    },
  });
  return data;
};

// delete the bus's booking
export const useDeleteBookingBus = () => {
  const data = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`/booking/bus/${id}`);
    },
  });
  return data;
};
