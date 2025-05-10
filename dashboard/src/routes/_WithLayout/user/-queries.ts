import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../../../lib/axios";
import { AxiosError, AxiosResponse } from "axios";

export type DashboardUser = Array<{
  id: number;
  name: string;
  email: string;
  _count: { buses?: number; hotels?: number };
}>;

export type ClientUser = Array<{
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  _count: { busBookings?: number; hotelBookings?: number };
}>;

export const useGetHotelOwners = (enabled: boolean) => {
  const data = useQuery<AxiosResponse<DashboardUser>, Error>({
    queryKey: ["getHotelOwners"],
    queryFn: async () => {
      return await instance.get("/users/hotel-owners");
    },
    enabled: enabled,
  });
  return data;
};

export const useGetBusOwners = (enabled: boolean) => {
  const data = useQuery<AxiosResponse<DashboardUser>, Error>({
    queryKey: ["getBusOwners"],
    queryFn: async () => {
      return await instance.get("/users/bus-owners");
    },
    enabled: enabled,
  });
  return data;
};

export const useGetTravelers = (enabled: boolean) => {
  const data = useQuery<AxiosResponse<ClientUser>, Error>({
    queryKey: ["getTravelers"],
    queryFn: async () => {
      return await instance.get("/users/travelers");
    },
    enabled: enabled,
  });
  return data;
};

export const useGetTravelAgents = (enabled: boolean) => {
  const data = useQuery<AxiosResponse<ClientUser>, Error>({
    queryKey: ["getTravelAgents"],
    queryFn: async () => {
      return await instance.get("/users/travel-agents");
    },
    enabled: enabled,
  });
  return data;
};
