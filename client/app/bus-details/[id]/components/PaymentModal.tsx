"use client";

import React, { SetStateAction, useState } from "react";
import { CheckCircle, X, CreditCard, Wallet } from "lucide-react";
import dayjs from "dayjs";

export const PaymentModal = ({
  close,
  handleBooking,
  handelBookingCashOnDelivery,
  hotelName,
  hotelPrice,
  busPrice,
  busFrom,
  busTo,
}: {
  hotelName?: string;
  close: (value: SetStateAction<boolean>) => void;
  handelBookingCashOnDelivery: () => void;
  handleBooking: () => void;
  hotelPrice?: string;
  busPrice?: string;
  busFrom?: string;
  busTo?: string;
}) => {
  const [activeStep, setActiveStep] = useState<
    "summary" | "card" | "cash" | "success"
  >("summary");
  const [paymentMethod, setPaymentMethod] = useState<
    "Credit/Debit" | "Cash on Arrival"
  >("Credit/Debit");

  const handleCardClick = () => {
    setPaymentMethod("Credit/Debit");
    setActiveStep("card");
  };
  const handleCashClick = () => {
    setPaymentMethod("Cash on Arrival");
    setActiveStep("cash");
  };
  const handlePaymentSuccess = () => {
    setActiveStep("success"), handleBooking();
  };

  const CloseButton = () => (
    <button
      onClick={close}
      className="absolute top-4 right-4 text-white hover:text-gray-300"
    >
      <X size={24} />
    </button>
  );

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCardErrors, setShowCardErrors] = useState(false);

  const validateCardDetails = () => {
    const cardNumberRegex = /^[0-9]{8,12}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    return (
      cardNumberRegex.test(cardNumber.replace(/\s/g, "")) &&
      cardName.trim() !== "" &&
      expiryDateRegex.test(expiryDate) &&
      cvvRegex.test(cvv)
    );
  };

  return (
    <div className="min-h-screen bg-[#25495700] fixed top-0 left-0 flex items-center justify-center py-10 font-serif w-full">
      {activeStep === "summary" && (
        <div className="w-[440px] relative bg-[#2F4B50] rounded-[20px] p-6 text-white text-left shadow-2xl space-y-6">
          <div>
            <CloseButton />
          </div>
          <h2 className="border border-white text-center w-full px-4 py-2 rounded tracking-widest uppercase text-sm">
            Booking Summary & Payment
          </h2>

          <div className="rounded-[12px] p-4 space-y-2 border border-white">
            <h3 className="text-lg font-semibold">Booking Summary</h3>
            <div className="flex justify-between text-sm">
              <span>{hotelName}</span>
              <span>{hotelPrice}</span>
            </div>
            {busFrom && (
              <div className="flex justify-between text-sm">
                <span>
                  Bus Ticket ({busFrom} to {busTo})
                </span>
                <span>{busPrice}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Service Fee</span>
              <span>Rs. 300</span>
            </div>
            <hr className="border-gray-400" />
            <div className="flex justify-between font-semibold text-base">
              <span>Total Amount</span>
              <span>
                Rs. {Number(hotelPrice ?? 0) + Number(busPrice ?? 0) + 300}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold">Select Payment Method</h3>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleCardClick}
                className="flex flex-col items-center justify-center gap-2 w-1/2 py-4 border border-white rounded-xl text-white hover:bg-[#3b5b63] transition"
              >
                <CreditCard size={32} className="text-blue-400" />
                <span className="text-sm">Credit/Debit Card</span>
              </button>
              <button
                onClick={handleCashClick}
                className="flex flex-col items-center justify-center gap-2 w-1/2 py-4 border border-white rounded-xl text-white hover:bg-[#3b5b63] transition"
              >
                <Wallet size={32} className="text-white" />
                <span className="text-sm">Cash on Arrival</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeStep === "card" && (
        <div className="w-[440px] bg-[#2F4B50] rounded-[20px] p-6 text-white shadow-2xl space-y-6 relative">
          <CloseButton />
          <h2 className="text-center font-bold text-xl">Credit/Debit Card</h2>

          {/* Card logos image */}
          <div className="flex justify-start">
            <img
              src="/images/visa-mastercard.png"
              alt="Visa and MasterCard"
              className="w-[100px] h-auto mb-2"
            />
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 rounded bg-[#3b5b63] text-white"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            {showCardErrors &&
              !/^[0-9]{13,19}$/.test(cardNumber.replace(/\s/g, "")) && (
                <p className="text-red-500 text-xs mt-1">Invalid card number</p>
              )}

            <input
              type="text"
              placeholder="Name on card"
              className="w-full p-2 rounded bg-[#3b5b63] text-white"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            {showCardErrors && cardName.trim() === "" && (
              <p className="text-red-500 text-xs mt-1">
                Name on card is required
              </p>
            )}

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 p-2 rounded bg-[#3b5b63] text-white"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              {showCardErrors &&
                !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate) && (
                  <p className="text-red-500 text-xs mt-1">
                    Invalid expiry date
                  </p>
                )}

              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 p-2 rounded bg-[#3b5b63] text-white"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
              {showCardErrors && !/^[0-9]{3,4}$/.test(cvv) && (
                <p className="text-red-500 text-xs mt-1">Invalid CVV</p>
              )}
            </div>

            <button
              onClick={() => {
                if (validateCardDetails()) {
                  handlePaymentSuccess();
                } else {
                  setShowCardErrors(true);
                }
              }}
              disabled={!validateCardDetails()}
              className={`w-full p-2 rounded ${
                validateCardDetails()
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

      {activeStep === "cash" && (
        <div className="w-[440px] bg-[#2F4B50] rounded-[20px] p-6 text-white shadow-2xl space-y-6 relative">
          <CloseButton />
          <h2 className="text-center font-bold text-xl">Cash on Arrival</h2>
          <p className="text-sm text-gray-300">
            Please confirm your booking. You will pay Rs.{" "}
            {Number(hotelPrice ?? 0) + Number(busPrice ?? 0) + 300} in cash at
            the time of arrival.
          </p>
          <button
            onClick={() => {
              handelBookingCashOnDelivery(), setActiveStep("success");
            }}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white p-2 rounded"
          >
            Confirm Booking
          </button>
        </div>
      )}

      {activeStep === "success" && (
        <div className="bg-[#2F4B50] text-white rounded-2xl shadow-2xl p-8 w-[480px] text-center space-y-6 relative">
          <CloseButton />
          <div className="flex justify-center">
            <CheckCircle size={64} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold">
            {paymentMethod === "Cash on Arrival"
              ? "Booking Confirmed!"
              : "Payment Successful!"}
          </h2>
          <p className="text-gray-300">
            {paymentMethod === "Cash on Arrival"
              ? "Your booking has been confirmed. Please pay the amount in cash upon arrival."
              : "Your booking has been confirmed. Thank you for your payment."}
          </p>

          <div className="bg-[#37595F] rounded-xl p-6 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Transaction ID:</span>
              <span className="text-white">TXN78965412</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Payment Method:</span>
              <span className="text-white">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">
                Amount {paymentMethod === "Cash on Arrival" ? "Due" : "Paid"}:
              </span>
              <span className="text-white">
                Rs. {Number(hotelPrice ?? 0) + Number(busPrice ?? 0) + 300}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Date & Time:</span>
              <span className="text-white">
                {dayjs().format("MMM DD YYYY,  h:mm:ss")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
