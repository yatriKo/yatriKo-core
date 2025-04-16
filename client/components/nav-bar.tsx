"use client";

import { useAuth } from "@/app/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { X, Menu, LogIn, CircleUserRound } from "lucide-react";
import { useState, useEffect } from "react";
import BookingPopup from "./booking-popup";

export default function NavBar() {
  const { token, setToken } = useAuth();

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
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
  ];

  // Determine icon sizes based on screen width
  const getIconSize = () => {
    if (screenSize.width <= 375) return 20; // Extra small screens
    if (screenSize.width <= 480) return 24; // Small screens
    return 32; // Default/larger screens
  };

  function handleLogout(): void {
    setToken(null);
  }

  const [showBooking, setShowBooking] = useState(false);

  function handleBookingClick(): void {
    setShowBooking(true);
  }

  return (
    <>
      <nav className="navbar h-[80px] fixed top-0 left-0 w-full bg-black/30 shadow-md z-50 px-2 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
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
        {!token ? (
          <div className="hidden md:flex items-center">
            <a
              href="/login"
              className="login-btn inline-flex items-center text-black font-bold bg-[#FEFAE0]/30 border-2 border-[#FEFAE0] px-3 sm:px-5 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-[#FEFAE0]/60 transition-all hover:scale-105 shadow-md"
            >
              <LogIn className="mr-1 sm:mr-2" size={16} /> Login
            </a>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 mt-2 rounded-sm bg-white">
              <DropdownMenuItem
                className="p-2 cursor-pointer"
                onClick={handleBookingClick}
              >
                My bookings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-2 cursor-pointer text-red-600"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
      {showBooking && <BookingPopup onClose={() => setShowBooking(false)} />}
    </>
  );
}
