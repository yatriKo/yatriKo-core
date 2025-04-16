"use client";

import { useGetHotelDetails } from "@/app/queries/queries";
import { DateRangePicker } from "@/components/date-picker-range";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";

function HotelDetails() {
  const { id } = useParams();

  const { data: hotelData, isFetching } = useGetHotelDetails(+id);
  console.log(hotelData);
  const [confirmationPopupActive, setConfirmationPopupActive] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{
    id?: number;
    label: string;
    price: string;
  } | null>(null);

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [paymentPopupActive, setPaymentPopupActive] = useState(false);
  const [finalPopupActive, setFinalPopupActive] = useState(false);

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
          <DateRangePicker placeholder="Pick your ideal date" />
        </div>

        {/* Room Options */}
        <div className="flex flex-row justify-center gap-4 mt-6 px-4 bg-[#F3EBEB] p-4 rounded-[10px]">
          {[
            {
              src: "/images/single.jpeg",
              label: "Single bed room",
              price: "1500/- per night",
            },
            {
              src: "/images/double.jpeg",
              label: "Double bed room",
              price: "2500/- per night",
            },
            {
              src: "/images/triple.jpeg",
              label: "Triple bed room",
              price: "3200/- per night",
            },
            {
              src: "/images/deluxe.jpeg",
              label: "Deluxe room",
              price: "4000/- per night",
            },
          ].map((room, idx) => (
            <div
              key={idx}
              className="rounded-[10px] overflow-hidden relative shadow-md bg-white text-[#264653] p-2 text-center text-sm"
            >
              <img
                src={room.src}
                alt={room.label}
                className="w-[203px] h-[199px] object-cover rounded-[4px] mx-auto"
              />
              <div className="mt-1 font-semibold text-sm">{room.label}</div>
              <div className="text-xs">{room.price}</div>
              <button
                onClick={() => {
                  setSelectedRoom({ label: room.label, price: room.price });
                  setConfirmationPopupActive(true);
                }}
                className="mt-1 bg-[#264653] text-white px-3 py-1 rounded-full text-xs hover:bg-[#1e3d4a] transition"
              >
                Book now
              </button>
            </div>
          ))}
        </div>

        {/* Confirmation Popup */}
        {confirmationPopupActive && selectedRoom && (
          <div className="confirmation-popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-[#264653E5] text-white rounded-[10px] shadow-xl z-[3000] p-10 font-serif">
            <h3 className="text-center text-xl tracking-widest border border-white px-6 py-2 rounded mb-8 w-fit mx-auto uppercase">
              Booking Confirmation
            </h3>

            <div className="flex justify-between gap-6">
              {/* Form Section */}
              <div className="flex flex-col flex-1 gap-4 text-sm">
                {["Name", "Number", "Email", "No. of room"].map(
                  (label, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <label className="w-[80px]">{label}</label>
                      <input
                        type={label === "Email" ? "email" : "text"}
                        className="flex-1 border border-white bg-transparent px-3 py-1 rounded outline-none focus:ring-2 focus:ring-white"
                      />
                    </div>
                  )
                )}
              </div>

              {/* Room Details Box */}
              <div className="w-[200px] border border-white rounded px-4 py-3 text-xs space-y-2 text-center">
                <div className="font-semibold text-base border-b pb-1 mb-2">
                  Room details
                </div>
                <p>{selectedRoom.label}</p>
                <p>Room type - AC / double bed</p>
                <p>Room price - {selectedRoom.price}</p>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="mt-10 text-center">
              <button
                onClick={() => {
                  setConfirmationPopupActive(false);
                  setPaymentPopupActive(true);
                }}
                className="border border-white px-8 py-2 rounded uppercase tracking-widest hover:bg-white hover:text-[#4C6663] transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Payment QR Popup */}
        {paymentPopupActive && (
          <div className="custom-popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-[#264653E5] rounded-[12px] p-8 text-white text-center shadow-2xl z-[4000] font-serif space-y-6">
            <h2 className="border border-white inline-block px-6 py-2 rounded tracking-widest uppercase text-sm">
              Payment Confirmation
            </h2>
            <img
              src="/images/qr.png"
              alt="QR Code"
              className="mx-auto w-[200px] h-[200px] object-contain"
            />
            <div className="text-sm leading-relaxed">
              Payment option <br /> - COA / Online
            </div>
            <button
              onClick={() => {
                setPaymentPopupActive(false);
                setFinalPopupActive(true);
              }}
              className="mt-2 border border-white px-6 py-2 rounded uppercase tracking-widest hover:bg-white hover:text-[#4c6663] transition"
            >
              Check Payment Status
            </button>
          </div>
        )}

        {/* Final Confirmation Popup */}
        {finalPopupActive && (
          <div className="custom-popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#264653E5] text-white rounded-lg shadow-xl z-[5000] p-8 w-[350px] text-center font-serif">
            <p className="text-lg mb-4">Payment Received </p>
            <p className="text-lg mb-4">Your booking has been confirmed!</p>
            <img
              src="/images/tick.png"
              alt="Confirmed"
              className="mx-auto w-[60px] h-[60px]"
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default HotelDetails;
