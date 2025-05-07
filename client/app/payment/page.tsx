// payment/PaymentPopup.tsx
'use client';

import React from 'react';

interface PaymentPopupProps {
  setPaymentPopupActive: (value: boolean) => void;
  setFinalPopupActive: (value: boolean) => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({
  setPaymentPopupActive,
  setFinalPopupActive,
}) => {
  return (
    <div className="fixed inset-0 bg-[#264353] z-[3999] flex items-center justify-center">
      <div className="custom-popup w-[440px] bg-[#264653] rounded-[20px] p-6 text-white text-left shadow-2xl font-serif space-y-6">
        <h2 className="border border-white text-center w-full px-4 py-2 rounded tracking-widest uppercase text-sm">
          Booking Summary & Payment
        </h2>

        {/* Booking Summary */}
        <div className="bg-[#264653E5] rounded-[12px] p-4 space-y-2 border border-white">
          <h3 className="text-lg font-semibold">Booking Summary</h3>
          <div className="flex justify-between text-sm">
            <span>Hotel Himalayan Heights</span>
            <span>Rs. 4,500</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Bus Ticket (Kathmandu to Pokhara)</span>
            <span>Rs. 1,200</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service Fee</span>
            <span>Rs. 300</span>
          </div>
          <hr className="border-gray-400" />
          <div className="flex justify-between font-semibold text-base">
            <span>Total Amount</span>
            <span>Rs. 6,000</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h3 className="text-white text-base font-semibold">Select Payment Method</h3>
          <div className="flex justify-between items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-green-500 rounded bg-green-900 hover:bg-green-800 transition">
              <img src="/images/esewa.png" alt="eSewa" className="w-6 h-6" />
              <span>eSewa</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 rounded bg-blue-900 hover:bg-blue-800 transition">
              <img src="/images/card.png" alt="Card" className="w-6 h-6" />
              <span>Credit/Debit Card</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded bg-gray-700 hover:bg-gray-600 transition">
              <img src="/images/cash.png" alt="Cash" className="w-6 h-6" />
              <span>Cash on Arrival</span>
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            setPaymentPopupActive(false);
            setFinalPopupActive(true);
          }}
          className="w-full mt-2 bg-gray-400 text-white px-6 py-2 rounded opacity-80 cursor-not-allowed"
          disabled
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
