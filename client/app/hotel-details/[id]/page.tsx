"use client";

import { useAuth } from "@/app/context/auth-context";
import {
  useBookHotel,
  useGetHotelDetails,
  useGetRooms,
} from "@/app/queries/queries";
import BookingCard from "@/components/booking-card";
import { DateRangePicker } from "@/components/date-picker-range";
import dayjs from "dayjs";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PaymentModal } from "./components/PaymentModal";
import Link from "next/link";
import { ChevronLeft, X } from "lucide-react";

function HotelDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("search");

  const [showEmailError, setShowEmailError] = useState(false);

  const { data: hotelData, isFetching } = useGetHotelDetails(+id);
  const [confirmationPopupActive, setConfirmationPopupActive] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{
    id?: number;
    label: string;
    price: number;
  } | null>(null);

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [paymentPopupActive, setPaymentPopupActive] = useState(false);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate } = useBookHotel();

  function handleDateChange(from: Date, to: Date) {
    setCheckInDate(from);
    setCheckOutDate(to);
  }

  function onBookingClick(id, label, price) {
    if (!token) {
      toast("Please login to book");
      return;
    }
    {
      setSelectedRoom({
        id,
        label,
        price,
      });
      setConfirmationPopupActive(true);
    }
  }

  const handleBooking = () => {
    mutate({
      roomId: selectedRoom?.id,
      from: checkInDate,
      to: checkOutDate,
      clientName,
      email,
    });
  };

  const handleBookingCashOnDelivery = () => {
    mutate({
      roomId: selectedRoom?.id,
      from: checkInDate,
      to: checkOutDate,
      clientName,
      email,
      paymentStatus: false,
    });
  };

  const { data: roomsData } = useGetRooms(+id, checkInDate, checkOutDate);

  // Hide confirmation popup when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const popup = document.querySelector(".confirmation-popup");
      if (
        confirmationPopupActive &&
        popup &&
        !popup.contains(event.target as Node)
      ) {
        setConfirmationPopupActive(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [confirmationPopupActive]);

  return isFetching ? (
    <div className="flex justify-center items-center h-screen">
      <p>loading...</p>
    </div>
  ) : (
    <div className="font-sans m-0 p-0 text-center text-[#264653] min-h-screen overflow-x-hidden bg-[#f5f5f5]">
      <main className="py-[100px]">
        {/* Header with booking icons */}
        <Link
          href={{
            pathname: "/destinations",
            query: { search: activeFilter },
          }}
          className="pl-4 items-center text-2xl mb-4 flex gap-1"
        >
          <ChevronLeft size={32} />
          Back
        </Link>
        <header className="flex items-center justify-between p-[10px_20px] bg-[rgba(254,250,224,0.3)]">
          <div className="flex flex-col items-start">
            <div className="text-[28px] font-['Newsreader',serif] font-bold text-[#264653]">
              {hotelData.name}
            </div>
            <div className="flex flex-col items-start gap-1 mt-2 ml-5 text-sm font-semibold text-[#264653]">
              {/* Location */}
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-[#264653]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
                {hotelData.location}
              </span>

              {/* Contact */}
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-[#264653]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884l2.122-.707a1 1 0 011.086.247l2.01 2.01a1 1 0 01.247 1.086l-.707 2.122a11.045 11.045 0 005.657 5.657l2.122-.707a1 1 0 011.086.247l2.01 2.01a1 1 0 01.247 1.086l-.707 2.122a1 1 0 01-1.08.747C7.163 19.977 0 12.837 0 4.997a1 1 0 01.747-1.08l2.122-.707a1 1 0 011.134.674z" />
                </svg>
                {hotelData.phoneNumber}
              </span>
            </div>
          </div>
        </header>

        {/* Scenic images row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4">
          {hotelData.image.map((image, idx) => (
            <div
              key={idx}
              className="rounded-[10px] overflow-hidden relative shadow-lg"
            >
              <img
                src={image}
                alt="Scenic"
                className="w-[440px] h-[229px] object-cover rounded-[10px]"
              />
            </div>
          ))}
        </div>

        {/* Check-in/Check-out Feature */}
        <div className="mt-12 text-[#264653] font-semibold text-sm">
          <label className="mr-2">Booking date:</label>
          <DateRangePicker
            placeholder="Pick your ideal date"
            onDateChange={handleDateChange}
          />
        </div>

        {/* Room Options */}
        <div className="grid grid-cols-3 gap-4 mt-6 px-4 bg-[#F3EBEB] p-4 rounded-[10px]">
          {roomsData ? (
            roomsData.map((room) => (
              <BookingCard
                type="hotel"
                key={room.id}
                id={room.id}
                label={room.roomType}
                price={room.price}
                image={room.image[0]}
                onBookingClick={onBookingClick}
              />
            ))
          ) : (
            <p>Select booking date to view available rooms</p>
          )}
        </div>

        {/* Confirmation Popup */}
        {confirmationPopupActive && selectedRoom && (
          <div className="confirmation-popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-[#264653] text-white rounded-[10px] shadow-xl z-[3000] p-10 font-serif">
            <div className="flex w-full justify-end mb-4">
              <X size={24} />
            </div>
            <h3 className="text-center text-xl tracking-widest border border-white px-6 py-2 rounded mb-8 w-fit mx-auto uppercase">
              Booking Confirmation
            </h3>

            <div className="flex justify-center gap-6">
              {token?.role === "TravelAgent" && (
                <div className="flex flex-col flex-1 gap-4 text-sm">
                  {["Client's Name", "Email"].map((label, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <label className="w-[80px]">{label}</label>
                      <input
                        type={label === "Email" ? "email" : "text"}
                        className="flex-1 border border-white bg-transparent px-3 py-1 rounded outline-none focus:ring-2 focus:ring-white"
                        value={label === "Email" ? email : clientName}
                        onChange={(e) => {
                          if (label === "Email") {
                            setEmail(e.target.value);
                            if (showEmailError) setShowEmailError(false);
                          } else {
                            setClientName(e.target.value);
                          }
                        }}
                      />
                    </div>
                  ))}
                  {/* Email Validation Error */}
                  {showEmailError &&
                    email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                      <p className="text-red-500 text-xs mt-1">
                        Invalid email format
                      </p>
                    )}
                </div>
              )}

              {/* Room Details Box */}
              <div className="w-[200px] border border-white rounded px-4 py-3 text-xs space-y-2 text-center">
                <div className="font-semibold text-base border-b pb-1 mb-2">
                  Room details
                </div>
                <p>{selectedRoom.label}</p>
                <p>{`${hotelData.name}, ${hotelData.location}`}</p>
                <p>Room price - Rs. {selectedRoom.price} per day</p>
                <p>
                  {`${dayjs(checkInDate).format("MMM D, YYYY")} - ${dayjs(
                    checkOutDate
                  ).format("MMM D, YYYY")}`}
                </p>
                <p>
                  Grand total - Rs.{" "}
                  {selectedRoom.price *
                    dayjs(checkOutDate).diff(dayjs(checkInDate), "day")}
                </p>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="mt-10 text-center">
              <button
                onClick={() => {
                  if (
                    token?.role === "TravelAgent" &&
                    (!clientName.trim() ||
                      !email.trim() ||
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                  ) {
                    setShowEmailError(true);
                  } else {
                    setConfirmationPopupActive(false);
                    setPaymentPopupActive(true);
                  }
                }}
                className={`border border-white px-8 py-2 rounded uppercase tracking-widest transition ${
                  token?.role === "TravelAgent" &&
                  (!clientName.trim() ||
                    !email.trim() ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white hover:text-[#4C6663]"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Payment QR Popup */}
        {paymentPopupActive && (
          <PaymentModal
            close={() => setPaymentPopupActive(false)}
            hotelName={hotelData.name}
            hotelPrice={
              (selectedRoom.price ?? 0) *
              dayjs(checkOutDate).diff(dayjs(checkInDate), "day")
            }
            handleBooking={handleBooking}
            handleBookingCashOnDelivery={handleBookingCashOnDelivery}
          />
        )}
      </main>
    </div>
  );
}

export default HotelDetails;
