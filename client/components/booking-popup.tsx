import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

function BookingPopup({ onClose }) {
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
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      id="booking-popup"
      className={`fixed top-1/2 left-1/2 w-[972px] h-[630px] bg-[#264653] rounded-[20px] transform -translate-x-1/2 -translate-y-1/2 z-[2000] p-[40px_20px] text-white text-center block md:w-[972px] md:h-[630px] md:p-[40px_20px] max-md:w-[90%] max-md:h-auto max-md:p-5`}
    >
      <button
        className="absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} className="text-[40px] text-white" />
      </button>
      <h2>My bookings</h2>
      {/* Booking content here */}
    </div>
  );
}
export default BookingPopup;
