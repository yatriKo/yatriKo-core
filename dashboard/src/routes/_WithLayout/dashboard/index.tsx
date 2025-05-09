import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  useDeleteBookingBus,
  useGetDashboardDetail,
  useGetDashboardDetailBus,
  useGetStats,
} from "./-queries";
import { useDeleteHotel } from "../hotel/-queries";
import { useState } from "react";
import { queryClient } from "../../__root";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./../../../../components/ui/dialog";
import { Button } from "./../../../../components/ui/button";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const Route = createFileRoute("/_WithLayout/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  //getting role
  const { getRole } = useAuth();

  // fetching data
  const { data, isLoading } = useGetDashboardDetail();
  const { data: busData, isLoading: busDataLoading } =
    useGetDashboardDetailBus();

  // posting data
  const { mutateAsync, isPending } = useDeleteHotel();
  const { mutateAsync: mutateAsyncBus, isPending: isDeletingBus } =
    useDeleteBookingBus();

  const { navigate } = useRouter();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [hotelId, setHotelId] = useState(0);

  // function to delete hotel
  const deleteHotel = () => {
    mutateAsync(hotelId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },
    });
  };

  // function to delete bus
  const deleteBus = () => {
    mutateAsyncBus(hotelId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["busBooking"] });
      },
    });
  };

  // total earning from the hotel
  const totalPrice =
    data?.data.reduce((acc, item) => acc + item.room.price, 0) || 0;

  // total earning from the bus
  const totalPriceBus =
    busData?.data.reduce((acc, item) => acc + item.BusSeat.price, 0) || 0;

  // Register chart elements for admin chart
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  const { data: adminData, isLoading: isAdminLoading } = useGetStats();
  const userData = {
    labels: ["Travelers", "Travel agents", "Guest house owners", "Bus owners"],
    datasets: [
      {
        label: "Number of users",
        data: [
          adminData?.data.travelerCount || 0,
          adminData?.data.travelAgentCount || 0,
          adminData?.data.hotelOwnerCount || 0,
          adminData?.data.busOwnerCount || 0,
        ],
        backgroundColor: ["#d6f365", "#f7b2f0", "#a0e9f1", "#b58af1"],
        borderRadius: 4,
      },
    ],
  };

  return (
    <div>
      {isLoading ||
      busDataLoading ||
      isAdminLoading ||
      isPending ||
      isDeletingBus ? (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {getRole() === "HotelOwner" ? (
            <>
              <div className="mb-10 border border-amber-300 w-fit p-4 rounded-4xl">
                <h2 className="text-5xl font-medium mb-2">Total Earning</h2>
                <h3 className="text-4xl">NRS. {totalPrice}</h3>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-medium">Bookings</h2>
              </div>
              <Table className="mt-8">
                <TableHeader>
                  <TableRow className="bg-[#26465333] hover:bg-[#26465325]">
                    <TableHead>Hotel Name</TableHead>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Date From</TableHead>
                    <TableHead>Date to</TableHead>
                    <TableHead>Booker's Name</TableHead>
                    <TableHead>Booker's Number</TableHead>
                    <TableHead>PaymentStatus</TableHead>
                    <TableHead className="w-[100px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data &&
                    data.data.map((hotel, idx) => (
                      <TableRow
                        key={idx}
                        className="cursor-pointer pointer-events-auto"
                        onClick={() => navigate({ to: `/hotel/${hotel.id}` })}
                      >
                        <TableCell>{hotel.room.hotel.name}</TableCell>
                        <TableCell>{hotel.room.id}</TableCell>
                        <TableCell>{hotel.room.roomType}</TableCell>
                        <TableCell>
                          {dayjs(hotel.dateFrom).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          {dayjs(hotel.dateTo).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>{hotel.user.name}</TableCell>
                        <TableCell>{hotel.user.phoneNumber}</TableCell>
                        <TableCell>
                          {hotel.paymentStatus ? "Paid" : "Not Paid"}
                        </TableCell>
                        <TableCell
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDeleteModal(true);
                            setHotelId(hotel.id);
                          }}
                        >
                          <Trash2 color="red" />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Dialog
                open={openDeleteModal}
                onOpenChange={() => setOpenDeleteModal(false)}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to delete this Booking?
                    </DialogTitle>
                    <DialogDescription className="my-4">
                      This action cannot be undone. This will permanently delete
                      the booking and remove your data from our servers.
                    </DialogDescription>
                    <div className="flex gap-2">
                      <Button
                        className="grow cursor-pointer"
                        onClick={() => setOpenDeleteModal(false)}
                        variant={"outline"}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="grow bg-red-600 hover:bg-red-500 cursor-pointer"
                        onClick={() => {
                          setOpenDeleteModal(false), deleteHotel();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          ) : getRole() === "BusOwner" ? (
            <>
              <div className="mb-10 border border-amber-300 w-fit p-4 rounded-4xl">
                <h2 className="text-5xl font-medium mb-2">Total Earning</h2>
                <h3 className="text-4xl">NRS. {totalPriceBus}</h3>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-medium">Bookings</h2>
              </div>
              <Table className="mt-8">
                <TableHeader>
                  <TableRow className="bg-[#26465333] hover:bg-[#26465325]">
                    <TableHead>Bus Number</TableHead>
                    <TableHead>Bus Seat Id</TableHead>
                    <TableHead>Bus Seat Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Booker's Name</TableHead>
                    <TableHead>Booker's Number</TableHead>
                    <TableHead>PaymentStatus</TableHead>
                    <TableHead className="w-[100px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {busData &&
                    busData.data.map((bus, idx) => (
                      <TableRow
                        key={idx}
                        className="cursor-pointer pointer-events-auto"
                      >
                        <TableCell>{bus.BusSeat.bus.busNumber}</TableCell>
                        <TableCell>{bus.busSeatId}</TableCell>
                        <TableCell>{bus.BusSeat.seatType}</TableCell>
                        <TableCell>{bus.BusSeat.bus.from}</TableCell>
                        <TableCell>{bus.BusSeat.bus.to}</TableCell>
                        <TableCell>{bus.user.name}</TableCell>
                        <TableCell>{bus.user.phoneNumber}</TableCell>
                        <TableCell>
                          {bus.paymentStatus ? "Paid" : "Not Paid"}
                        </TableCell>
                        <TableCell
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDeleteModal(true);
                            setHotelId(bus.id);
                          }}
                        >
                          <Trash2 color="red" />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Dialog
                open={openDeleteModal}
                onOpenChange={() => setOpenDeleteModal(false)}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to delete this Booking?
                    </DialogTitle>
                    <DialogDescription className="my-4">
                      This action cannot be undone. This will permanently delete
                      the booking and remove your data from our servers.
                    </DialogDescription>
                    <div className="flex gap-2">
                      <Button
                        className="grow cursor-pointer"
                        onClick={() => setOpenDeleteModal(false)}
                        variant={"outline"}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="grow bg-red-600 hover:bg-red-500 cursor-pointer"
                        onClick={() => {
                          setOpenDeleteModal(false), deleteBus();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <div className="bg-white shadow-lg p-4 rounded-xl text-black">
                <h2 className="text-5xl font-medium mb-2">Number of users</h2>
                <Bar
                  data={userData}
                  options={{
                    scales: {
                      y: {
                        suggestedMax:
                          Math.max(...(userData?.datasets[0].data || 0)) + 2,
                      },
                    },
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
