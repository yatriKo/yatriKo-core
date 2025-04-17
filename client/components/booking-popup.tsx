import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBusBookings, useGetHotelBookings } from "@/app/queries/queries";
import dayjs from "dayjs";

function BookingPopup({ onClose }) {
  const { data: hotelBookings, isFetching: isFetchingHotelBookings } =
    useGetHotelBookings();
  const { data: busBookings, isFetching: isFetchingBusBookings } =
    useGetBusBookings();

  console.log(busBookings);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const bookingIcon = document.querySelector(".fa-house");
      const bookingPopup = document.getElementById("booking-popup");

      if (
        bookingPopup &&
        !bookingPopup.contains(event.target as Node) &&
        bookingIcon &&
        bookingIcon.parentElement &&
        !bookingIcon.parentElement.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      id="booking-popup"
      className={`fixed top-1/2 left-1/2 w-[972px] h-[630px] bg-[#264653] rounded-[20px] transform -translate-x-1/2 -translate-y-1/2 z-[2000] p-[40px_20px] text-white block md:w-[972px] md:h-[630px] md:p-[40px_20px] max-md:w-[90%] max-md:h-auto max-md:p-5 overflow-auto`}
    >
      <button
        className="absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} className="text-[40px] text-white" />
      </button>
      <h2 className="text-center">My bookings</h2>
      {isFetchingHotelBookings || isFetchingBusBookings ? (
        <p>loading</p>
      ) : (
        <div className="mt-8">
          <div>
            <h3>Hotel bookings</h3>
            <Table className="mt-4 border border-white">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-white">Id</TableHead>
                  <TableHead className="text-white">Hotel</TableHead>
                  <TableHead className="text-white">Room type</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Amount</TableHead>
                  <TableHead className="text-white">Payment Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotelBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{`${booking.room.hotel.name}, ${booking.room.hotel.location}`}</TableCell>
                    <TableCell>{booking.room.roomType}</TableCell>
                    <TableCell>{`${dayjs(booking.dateFrom).format(
                      "D MMM YYYY"
                    )} - ${dayjs(booking.dateTo).format(
                      "D MMM YYYY"
                    )}`}</TableCell>
                    <TableCell>{`Rs. ${booking.room.price}`}</TableCell>
                    <TableCell>
                      {booking.paymentStatus ? "Paid" : "Unpaid"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-8">
            <h3>Bus bookings</h3>
            <Table className="mt-4 border border-white">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-white">Id</TableHead>
                  <TableHead className="text-white">Bus number</TableHead>
                  <TableHead className="text-white">Trip</TableHead>
                  <TableHead className="text-white">Seat type</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Amount</TableHead>
                  <TableHead className="text-white">Payment Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{`${booking.BusSeat.bus.busNumber}`}</TableCell>
                    <TableCell>{`${booking.BusSeat.bus.from} - ${booking.BusSeat.bus.to}`}</TableCell>
                    <TableCell>{booking.BusSeat.seatType}</TableCell>
                    <TableCell>
                      {dayjs(booking.date).format("D MMM YYYY, H:mm")}
                    </TableCell>
                    <TableCell>{`Rs. ${booking.BusSeat.price}`}</TableCell>
                    <TableCell>
                      {booking.paymentStatus ? "Paid" : "Unpaid"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
export default BookingPopup;
