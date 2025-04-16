'use client';

import { useState, useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSearch,
  faBus,
  faBed,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [bookingPopupActive, setBookingPopupActive] = useState(false);
  const [confirmationPopupActive, setConfirmationPopupActive] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ id?: number; label: string; price: string } | null>(null);

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [paymentPopupActive, setPaymentPopupActive] = useState(false);
  const [finalPopupActive, setFinalPopupActive] = useState(false);

  // Hide sidebar when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarActive(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide booking popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popups = document.querySelectorAll('.custom-popup, .confirmation-popup');

      let clickedInsideAnyPopup = false;
      popups.forEach(popup => {
        if (popup.contains(event.target as Node)) {
          clickedInsideAnyPopup = true;
        }
      });

      if (!clickedInsideAnyPopup) {
        setConfirmationPopupActive(false);
        setPaymentPopupActive(false);
        setFinalPopupActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide confirmation popup when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const popup = document.querySelector('.confirmation-popup');
      if (confirmationPopupActive && popup && !popup.contains(event.target as Node)) {
        setConfirmationPopupActive(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [confirmationPopupActive]);

  const toggleSidebar = () => setSidebarActive(!sidebarActive);
  const toggleBookingPopup = () => setBookingPopupActive(!bookingPopupActive);

  return (
    <div className="font-sans m-0 p-0 text-center text-[#264653] min-h-screen overflow-x-hidden bg-[#f5f5f5]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-[rgba(0,0,0,0.3)] z-[1000] py-[15px] px-[20px] flex items-center justify-between">
        <div className="text-2xl font-bold text-[#FEFAE0] mr-5 order-1">
          <span className="italic">Yatri</span> <span className="text">को</span>
        </div>

        <ul className="list-none flex items-center justify-center flex-grow order-2 md:flex hidden">
          <li className="mx-[15px]">
            <Link href="/homepage" className="no-underline text-[#FEFAE0] text-lg transition-all duration-300">
              Home Page
            </Link>
          </li>
          <li className="mx-[15px]">
            <Link href="/about" className="no-underline text-[#FEFAE0] text-lg transition-all duration-300">
              About Us
            </Link>
          </li>
          <li className="mx-[15px]">
            <Link href="/services" className="no-underline text-[#FEFAE0] text-lg transition-all duration-300">
              Services
            </Link>
          </li>
        </ul>

        <div className="order-3 ml-auto md:block hidden">
          <Link
            href="/login"
            className="bg-[rgba(254,250,224,0.3)] text-[#000000] font-bold py-3 px-5 border-2 border-[#FEFAE0] rounded-lg cursor-pointer text-base transition-all duration-300 no-underline"
          >
            Login
          </Link>
        </div>

        <div
          className="md:hidden block text-2xl cursor-pointer ml-5 order-4 text-[#FEFAE0]"
          onClick={toggleSidebar}
        >
          &#9776;
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`absolute top-[70px] left-0 w-full bg-[rgba(158,149,149,0.85)] ${
          sidebarActive ? 'flex' : 'hidden'
        } flex-col items-center py-5 z-[1500]`}
      >
        <ul className="list-none p-0 m-0 text-center">
          <li className="my-[15px]">
            <Link href="/homepage" className="text-[#FEFAE0] no-underline text-xl font-bold">
              Home Page
            </Link>
          </li>
          <li className="my-[15px]">
            <Link href="/about" className="text-[#FEFAE0] no-underline text-xl font-bold">
              About Us
            </Link>
          </li>
          <li className="my-[15px]">
            <Link href="/services" className="text-[#FEFAE0] no-underline text-xl font-bold">
              Services
            </Link>
          </li>
          <li className="my-[15px]">
            <Link href="/login" className="text-[#FEFAE0] no-underline text-xl font-bold">
              Login
            </Link>
          </li>
        </ul>
      </div>

      <main className="pt-[100px]">
        {/* Header with booking icons */}
        <header className="flex items-center justify-between p-[10px_20px] bg-[rgba(254,250,224,0.3)]">
  <div className="flex flex-col items-start">
    <div className="text-[28px] font-['Newsreader',serif] font-bold text-[#264653]">
      Lemon Tree GuestHouse
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
    Nagarchowk, Chitwan
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
    01-4321388, +977 9811223344
  </span>
</div>


  </div>

  <div className="flex gap-2 items-center">
    <div className="relative w-[70px] h-[70px] bg-[#26465333] flex items-center justify-center rounded-full group">
      <FontAwesomeIcon icon={faBus} className="text-[30px] text-[#264653]" />
      <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-[#264653] text-[#FEFAE0] py-[6px] px-[10px] rounded-md text-[13px] font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible">
        Book Bus
      </span>
    </div>
    <div className="relative w-[70px] h-[70px] bg-[#26465333] flex items-center justify-center rounded-full group">
      <FontAwesomeIcon icon={faBed} className="text-[30px] text-[#264653]" />
      <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-[#264653] text-[#FEFAE0] py-[6px] px-[10px] rounded-md text-[13px] font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible">
        Book Guesthouse
      </span>
    </div>
    <div
      className="relative w-[70px] h-[70px] bg-[#26465333] flex items-center justify-center rounded-full group cursor-pointer"
      onClick={toggleBookingPopup}
    >
      <FontAwesomeIcon icon={faHouse} className="text-[30px] text-[#264653]" />
      <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-[#264653] text-[#FEFAE0] py-[6px] px-[10px] rounded-md text-[13px] font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible">
        View Booking Status
      </span>
    </div>
  </div>
</header>

        {/* Scenic images row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4">
  {[{ src: '/images/dummy1.jpeg' }, { src: '/images/dummy2.jpeg' }, { src: '/images/dummy3.jpeg' }].map((place, idx) => (
    <div key={idx} className="rounded-[10px] overflow-hidden relative shadow-lg">
      <img
        src={place.src}
        alt="Scenic"
        className="w-[440px] h-[229px] object-cover rounded-[10px]"
      />
    </div>
  ))}
</div>

        {/* ✅ Check-in/Check-out Feature (Updated layout) */}
<div className="flex flex-col gap-3 mt-4 ml-5 text-[#264653] font-semibold text-sm">
  <div className="flex flex-col sm:flex-row gap-6">
    {/* Check-in */}
    <div className="flex flex-col">
      <label className="mb-1">Check-in date</label>
      <DatePicker
        selected={checkInDate}
        onChange={(date) => setCheckInDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select check-in"
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#264653]"
      />
    </div>

    {/* Check-out */}
    <div className="flex flex-col">
      <label className="mb-1">Check-out date</label>
      <DatePicker
        selected={checkOutDate}
        onChange={(date) => setCheckOutDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select check-out"
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#264653]"
      />
    </div>
  </div>
</div>

        {/* Room Options */}
        <div className="flex flex-row justify-center gap-4 mt-6 px-4 bg-[#F3EBEB] p-4 rounded-[10px]">
          {[
            { src: '/images/single.jpeg', label: 'Single bed room', price: '1500/- per night' },
            { src: '/images/double.jpeg', label: 'Double bed room', price: '2500/- per night' },
            { src: '/images/triple.jpeg', label: 'Triple bed room', price: '3200/- per night' },
            { src: '/images/deluxe.jpeg', label: 'Deluxe room', price: '4000/- per night' },
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

        {/* Booking Status Popup */}
        <div
          id="booking-popup"
          className={`fixed top-1/2 left-1/2 w-[972px] h-[630px] bg-[#264653E5] rounded-[20px] transform -translate-x-1/2 -translate-y-1/2 z-[2000] p-[40px_20px] text-white text-center ${
            bookingPopupActive ? 'block' : 'hidden'
          } md:w-[972px] md:h-[630px] md:p-[40px_20px] max-md:w-[90%] max-md:h-auto max-md:p-5`}
        >
          <h2>My bookings</h2>

          <div className="mt-6 border border-white">
            <div className="grid grid-cols-4 text-white font-semibold text-center border-b border-white">
              <div className="border-r border-white py-2">Type</div>
              <div className="border-r border-white py-2">Bus detail</div>
              <div className="border-r border-white py-2">Dates</div>
              <div className="py-2">Status</div>
            </div>

            {/* Empty space for future content */}
            <div className="grid grid-cols-4 text-white text-center h-[200px]">
              <div className="border-r border-white py-2"></div>
              <div className="border-r border-white py-2"></div>
              <div className="border-r border-white py-2"></div>
              <div className="py-2"></div>
            </div>
          </div>
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
                {['Name', 'Number', 'Email', 'No. of room'].map((label, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <label className="w-[80px]">{label}</label>
                    <input
                      type={label === 'Email' ? 'email' : 'text'}
                      className="flex-1 border border-white bg-transparent px-3 py-1 rounded outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                ))}
              </div>

              {/* Room Details Box */}
              <div className="w-[200px] border border-white rounded px-4 py-3 text-xs space-y-2 text-center">
                <div className="font-semibold text-base border-b pb-1 mb-2">Room details</div>
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
            <img src="/images/qr.png" alt="QR Code" className="mx-auto w-[200px] h-[200px] object-contain" />
            <div className="text-sm leading-relaxed">Payment option <br /> - COA / Online</div>
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
    <img src="/images/tick.png" alt="Confirmed" className="mx-auto w-[60px] h-[60px]" />
  </div>
)}

      </main>
    </div>
  );
}

export default App;
