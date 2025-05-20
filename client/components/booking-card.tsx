export default function BookingCard({
  type,
  id,
  label,
  price,
  total,
  image,
  onBookingClick,
}: {
  type: "bus" | "hotel";
  id: number;
  label: string;
  price: number;
  total?: string | number;
  image?: string;
  onBookingClick: any;
}) {
  return (
    <div className="rounded-[10px] overflow-hidden relative shadow-md bg-white text-[#264653] p-2 text-center text-sm">
      {image && (
        <img
          src={image}
          alt={label}
          className="w-[203px] h-[199px] object-cover rounded-[4px] mx-auto"
        />
      )}
      <div className="mt-1 font-semibold text-sm">{label}</div>
      <div className="text-xs">
        {type == "hotel"
          ? `Rs. ${total} (Rs. ${price} per night)`
          : `Rs. ${price}`}
      </div>
      <button
        onClick={() => onBookingClick(id, label, price)}
        className="mt-1 bg-[#264653] text-white px-3 py-1 rounded-full text-xs hover:bg-[#1e3d4a] transition"
      >
        Book now
      </button>
    </div>
  );
}
