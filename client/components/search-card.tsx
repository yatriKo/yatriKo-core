import Image from "next/image";

function SearchCard({
  image,
  name,
  addInfo,
  href,
}: {
  image: string;
  name: string;
  addInfo?: string;
  href?: string;
}) {
  return (
    <a href={href || "#"}>
      <div className="rounded-[10px] overflow-hidden relative shadow-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-[300px] object-cover rounded-[10px]"
        />
        <span className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 bg-[#264653cc] px-3 py-1 rounded text-white text-sm font-semibold">
          {`${name}`}
          {addInfo && <br />}
          {`${addInfo ? " " + addInfo : ""}`}
        </span>
      </div>
    </a>
  );
}

export default SearchCard;
