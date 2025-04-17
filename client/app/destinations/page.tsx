"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBus, faBed } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useBusSearch, useHotelSearch } from "../queries/queries";
import SearchCard from "@/components/search-card";
import dayjs from "dayjs";

function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [searchVal, setSearchVal] = useState(search || "");

  const [isHotelSearch, setIsHotelSearch] = useState(true);

  const { data: hotelsData, isFetching: isFetchingHotels } =
    useHotelSearch(search);
  const { data: busData, isFetching: isFetchingBus } = useBusSearch(search);

  function handleSearchSubmit(event): void {
    event.preventDefault();
    router.push(`/destinations?search=${searchVal}`);
  }

  return (
    <div className="font-sans m-0 p-0 text-center text-[#264653] min-h-screen overflow-x-hidden bg-[#f5f5f5]">
      <main className="py-[100px]">
        <header className="flex items-center justify-between p-[10px_20px] bg-[rgba(254,250,224,0.3)]">
          <div className="flex flex-col items-start">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center border-2 border-[#ccc] p-[10px] rounded-[5px] w-[300px] mt-[10px] font-bold text-[#264653]">
                <input
                  type="text"
                  placeholder="Search your destination"
                  value={searchVal}
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                  }}
                  className="border-none outline-none p-[5px] flex-1 bg-transparent text-black placeholder:font-bold placeholder:text-[#264653] placeholder:font-['Newsreader',serif]"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-[#264653] text-lg ml-[10px]"
                />
              </div>
            </form>
          </div>

          <div className="flex gap-2 items-center">
            <div
              className="relative w-[70px] h-[70px] bg-[#26465333] flex items-center justify-center rounded-full group cursor-pointer"
              onClick={() => setIsHotelSearch(true)}
            >
              <FontAwesomeIcon
                icon={faBed}
                className={`text-[30px] ${
                  isHotelSearch ? "text-[#26465333]" : "text-[#264653]"
                }`}
              />
              <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-[#264653] text-[#FEFAE0] py-[6px] px-[10px] rounded-md text-[13px] font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Book Guesthouse
              </span>
            </div>
            <div
              className="relative w-[70px] h-[70px] bg-[#26465333] flex items-center justify-center rounded-full group cursor-pointer"
              onClick={() => setIsHotelSearch(false)}
            >
              <FontAwesomeIcon
                icon={faBus}
                className={`text-[30px] ${
                  !isHotelSearch ? "text-[#26465333]" : "text-[#264653]"
                }`}
              />
              <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-[#264653] text-[#FEFAE0] py-[6px] px-[10px] rounded-md text-[13px] font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Book Bus
              </span>
            </div>
          </div>
        </header>

        {/* Popular Destinations */}
        <h2 className="font-['Nirmala UI',sans-serif] text-2xl mt-6 font-bold">
          {`POPULAR ${isHotelSearch ? "HOTELS" : "BUS ROUTES"}`}
        </h2>

        {/* Grid of 9 Images in 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4">
          {isHotelSearch
            ? isFetchingHotels
              ? "Loading"
              : hotelsData.data.map((data) => {
                  return (
                    <SearchCard
                      href={`/hotel-details/${data.id}`}
                      image={data.image[0]}
                      name={data.name}
                      key={data.name}
                    />
                  );
                })
            : isFetchingBus
            ? "Loading"
            : busData.data.map((data) => {
                return (
                  <SearchCard
                    image={data.image[0]}
                    href={`/bus-details/${data.id}`}
                    name={`${data.from} - ${data.to}`}
                    addInfo={`${dayjs(data.date).format("D MMMM YYYY, HH:mm")}`}
                    key={data.date}
                  />
                );
              })}
        </div>
      </main>
    </div>
  );
}

export default App;
