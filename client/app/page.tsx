"use client";

import React, { useState, useEffect } from "react";
import { Search, LogIn, X, Menu } from "lucide-react";

export default function YatriLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: 0,
    isMobile: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width: width,
        isMobile: width <= 768,
      });

      // Close mobile menu if screen becomes larger
      if (width > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { label: "Home Page", href: "#" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
  ];

  // Determine icon sizes based on screen width
  const getIconSize = () => {
    if (screenSize.width <= 375) return 20; // Extra small screens
    if (screenSize.width <= 480) return 24; // Small screens
    return 32; // Default/larger screens
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/mountain.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="navbar fixed top-0 left-0 w-full bg-black/30 shadow-md z-50 px-2 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
        <div className="logo text-[#FEFAE0] text-xl sm:text-2xl font-bold">
          <span className="font-newsreader italic text-base sm:text-2xl">
            Yatri
          </span>{" "}
          <span className="font-newsreader text-base sm:text-2xl">को</span>
        </div>

        {/* Burger Menu Icon */}
        <div
          className="burger text-[#FEFAE0] cursor-pointer md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X size={getIconSize()} />
          ) : (
            <Menu size={getIconSize()} />
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && screenSize.isMobile && (
          <div className="mobile-menu absolute top-full left-0 w-full bg-black/30 py-2 sm:py-4">
            <ul className="flex flex-col items-center">
              {menuItems.map((item, index) => (
                <li key={index} className="w-full text-center my-1 sm:my-2">
                  <a
                    href={item.href}
                    className="text-[#FEFAE0] text-base sm:text-lg block py-1 sm:py-2 hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="w-full text-center mt-2 sm:mt-4">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center text-black font-bold bg-[#FEFAE0]/30 border-2 border-[#FEFAE0] px-3 sm:px-5 py-1 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-[#FEFAE0]/60 transition-all hover:scale-105 shadow-md"
                >
                  <LogIn className="mr-1 sm:mr-2" size={16} /> Login
                </a>
              </li>
            </ul>
          </div>
        )}

        {/* Desktop Navigation */}
        <ul className="hidden md:flex nav-links items-center justify-center flex-grow">
          {menuItems.map((item, index) => (
            <li key={index} className="mx-2 sm:mx-4">
              <a
                href={item.href}
                className="text-[#FEFAE0] text-base sm:text-lg relative nav-link-hover"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Login Button */}
        <div className="hidden md:flex items-center">
          <a
            href="/login"
            className="login-btn inline-flex items-center text-black font-bold bg-[#FEFAE0]/30 border-2 border-[#FEFAE0] px-3 sm:px-5 py-1 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-[#FEFAE0]/60 transition-all hover:scale-105 shadow-md"
          >
            <LogIn className="mr-1 sm:mr-2" size={16} /> Login
          </a>
        </div>
      </nav>

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

        <div className="search-bar w-full max-w-xs sm:max-w-xl md:max-w-md px-2 sm:px-4 h-10 sm:h-14 bg-[#FEFAE0]/60 rounded-3xl border-2 border-[#FEFAE0] flex items-center">
          <input
            type="text"
            placeholder="Search your destination"
            className="flex-grow bg-transparent outline-none text-base sm:text-lg text-black placeholder-black/70"
          />
          <button className="search-btn bg-transparent text-black hover:scale-105 transition-transform">
            <Search size={getIconSize() - 8} />
          </button>
        </div>
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
