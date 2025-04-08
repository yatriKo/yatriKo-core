'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    const handleClickOutside = (event: MouseEvent) => {
      const bookingIcon = document.querySelector('.fa-house');
      const bookingPopup = document.getElementById('booking-popup');

      if (
        bookingPopup &&
        !bookingPopup.contains(event.target as Node) &&
        bookingIcon &&
        bookingIcon.parentElement &&
        !bookingIcon.parentElement.contains(event.target as Node)
      ) {
        setBookingPopupActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleBookingPopup = () => {
    setBookingPopupActive(!bookingPopupActive);
  };

  return (
    <div className="font-sans m-0 p-0 text-center text-[#264653] min-h-screen overflow-x-hidden bg-[#f5f5f5]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-[rgba(0,0,0,0.3)] z-[1000] py-[15px] px-[20px] flex items-center justify-between">
        <div className="text-2xl font-bold text-[#FEFAE0] mr-5 order-1">
          <span className="italic">Yatri</span> <span className="hindi-text">को</span>
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
        <header className="flex items-center justify-between p-[10px_20px] bg-[rgba(254,250,224,0.3)]">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-[10px] text-[28px] font-['Newsreader',serif] font-bold">
              <FontAwesomeIcon icon={faUser} className="text-2xl text-[#264653]" />
              <strong>Welcome, user.</strong>
            </div>
            <div className="flex items-center border-2 border-[#ccc] p-[10px] rounded-[5px] w-[300px] mt-[10px] font-bold text-[#264653]">
              <input
                type="text"
                placeholder="Search your destination"
                className="border-none outline-none p-[5px] flex-1 bg-transparent text-black placeholder:font-bold placeholder:text-[#264653] placeholder:font-['Newsreader',serif]"
              />
              <FontAwesomeIcon icon={faSearch} className="text-[#264653] text-lg ml-[10px]" />
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

        {/* Popular Destinations */}
        <h2 className="font-['Nirmala UI',sans-serif] text-2xl mt-6 font-bold">POPULAR DESTINATIONS</h2>

        {/* Grid of 9 Images in 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4">
          {[
            { src: '/images/shey_phoksundo.jpg', title: 'SHEY PHOKSUNDO' },
            { src: '/images/mustang.jpg', title: 'MUSTANG' },
            { src: '/images/annapurna.jpg', title: 'ANNAPURNA BASE CAMP' },
            
          
            { src: '/images/chitwan.jpg', title: 'CHITWAN' },
          
            { src: '/images/pokhara.jpg', title: 'POKHARA' },
            
          ].map((place, idx) => (
            <div key={idx} className="rounded-[10px] overflow-hidden relative shadow-lg">
              <img src={place.src} alt={place.title} className="w-full h-[300px] object-cover rounded-[10px]" />
              <span className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 bg-[#264653cc] px-3 py-1 rounded text-white text-sm font-semibold">
                {place.title}
              </span>
            </div>
          ))}
        </div>

        {/* Booking Popup */}
        <div
          id="booking-popup"
          className={`fixed top-1/2 left-1/2 w-[972px] h-[630px] bg-[#264653E5] rounded-[20px] transform -translate-x-1/2 -translate-y-1/2 z-[2000] p-[40px_20px] text-white text-center ${
            bookingPopupActive ? 'block' : 'hidden'
          } md:w-[972px] md:h-[630px] md:p-[40px_20px] max-md:w-[90%] max-md:h-auto max-md:p-5`}
        >
          <h2>My bookings</h2>
          {/* Booking content here */}
        </div>
      </main>
    </div>
  );
}

export default App;
