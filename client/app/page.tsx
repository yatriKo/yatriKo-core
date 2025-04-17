"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function YatriLandingPage() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");
  const handleChange = (event) => {
    setSearchVal(event.target.value);
  };

  function handleSearchSubmit(event): void {
    event.preventDefault();
    router.push(`/destinations?search=${searchVal}`);
  }

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-screen flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/mountain.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="hero relative z-10 flex-grow flex flex-col justify-center items-center text-center text-[#FEFAE0] px-2 sm:px-4 mt-12 sm:mt-16">
        <h1 className="text-4xl sm:text-6xl mb-2 sm:mb-4">
          <span className="font-newsreader italic font-extrabold text-[80px] sm:text-[118px]">
            Yatri
          </span>
          <span className="font-newsreader font-bold text-[90px] sm:text-[128px]">
            को
          </span>
        </h1>
        <p className="text-base sm:text-lg mb-4 sm:mb-6 font-bold">
          Roam. Discover. Repeat - Your Travel, One Platform
        </p>

        <form className="max-w-xs w-full" onSubmit={handleSearchSubmit}>
          <div className="search-bar sm:max-w-xl md:max-w-md px-2 sm:px-4 h-10 sm:h-14 bg-[#FEFAE0]/60 rounded-3xl border-2 border-[#FEFAE0] flex items-center">
            <input
              type="text"
              value={searchVal}
              onChange={handleChange}
              required
              placeholder="Search your destination"
              className="flex-grow bg-transparent outline-none text-base sm:text-lg text-black placeholder-black/70"
            />
            <button
              type="submit"
              className="search-btn bg-transparent text-black hover:scale-105 transition-transform"
            >
              <Search />
            </button>
          </div>
        </form>
      </section>

      <style jsx>{`
        .nav-link-hover::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 0;
          height: 3px;
          background: #fefae0;
          transition: width 0.3s ease;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
