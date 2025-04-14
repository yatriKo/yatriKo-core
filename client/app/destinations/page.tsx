"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBus,
  faBed,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { useHotelSearch } from "../queries/queries";
import SearchCard from "@/components/search-card";

function App() {
  const [bookingPopupActive, setBookingPopupActive] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const { data: hotelsData, isFetching } = useHotelSearch(search);
  console.log(hotelsData);

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
        setBookingPopupActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleBookingPopup = () => {
    setBookingPopupActive(!bookingPopupActive);
  };

  return (
    <div className="font-sans m-0 p-0 text-center text-[#264653] min-h-screen overflow-x-hidden bg-[#f5f5f5]">
      <main className="py-[100px]">
        <header className="flex items-center justify-between p-[10px_20px] bg-[rgba(254,250,224,0.3)]">
          <div className="flex flex-col items-start">
            <div className="flex items-center border-2 border-[#ccc] p-[10px] rounded-[5px] w-[300px] mt-[10px] font-bold text-[#264653]">
              <input
                type="text"
                placeholder="Search your destination"
                className="border-none outline-none p-[5px] flex-1 bg-transparent text-black placeholder:font-bold placeholder:text-[#264653] placeholder:font-['Newsreader',serif]"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="text-[#264653] text-lg ml-[10px]"
              />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="relative w-[70px] h-[70px] bg-[#26465333] flex items-center justify-center rounded-full group">
              <FontAwesomeIcon
                icon={faBus}
                className="text-[30px] text-[#264653]"
              />
              <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-[#264653] text-[#FEFAE0] py-[6px] px-[10px] rounded-md text-[13px] font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Book Bus
              </span>
            </div>
            <div className="relative w-[70px] h-[70px] bg-[#26465333] flex items-center justify-center rounded-full group">
              <FontAwesomeIcon
                icon={faBed}
                className="text-[30px] text-[#264653]"
              />
              <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-[#264653] text-[#FEFAE0] py-[6px] px-[10px] rounded-md text-[13px] font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Book Guesthouse
              </span>
            </div>
            <div
              className="relative w-[70px] h-[70px] bg-[#26465333] flex items-center justify-center rounded-full group cursor-pointer"
              onClick={toggleBookingPopup}
            >
              <FontAwesomeIcon
                icon={faHouse}
                className="text-[30px] text-[#264653]"
              />
              <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-[#264653] text-[#FEFAE0] py-[6px] px-[10px] rounded-md text-[13px] font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                View Booking Status
              </span>
            </div>
          </div>
        </header>

        {/* Popular Destinations */}
        <h2 className="font-['Nirmala UI',sans-serif] text-2xl mt-6 font-bold">
          POPULAR DESTINATIONS
        </h2>

        {/* Grid of 9 Images in 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4">
          {isFetching
            ? "Loading"
            : hotelsData.data.map((data) => {
                return (
                  <SearchCard
                    image={data.image}
                    name={data.name}
                    key={data.name}
                  />
                );
              })}
        </div>

        {/* Booking Popup */}
        <div
          id="booking-popup"
          className={`fixed top-1/2 left-1/2 w-[972px] h-[630px] bg-[#264653E5] rounded-[20px] transform -translate-x-1/2 -translate-y-1/2 z-[2000] p-[40px_20px] text-white text-center ${
            bookingPopupActive ? "block" : "hidden"
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
