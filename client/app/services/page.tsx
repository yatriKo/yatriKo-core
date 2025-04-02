"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaHiking, FaBed, FaBus } from 'react-icons/fa';

export default function ServicesPage() {
  const router = useRouter();

  const services = [
    {
      icon: FaHiking,
      title: 'TRAVEL DESTINATIONS',
      description: 'Explore exciting destinations with our curated travel options, ensuring a memorable experience wherever you go.',
      link: '/destinations'
    },
    {
      icon: FaBed,
      title: 'GUESTHOUSE BOOKING',
      description: 'Find and book comfortable guesthouses that suit your budget and preferences for a relaxing stay.',
      link: '/guesthouse'
    },
    {
      icon: FaBus,
      title: 'BUS SEAT BOOKING',
      description: 'Secure your bus seats easily with our hassle-free booking system, ensuring a smooth and convenient journey.',
      link: '/bus-booking'
    }
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-[#FEFAE0] text-[#FEFAE0] font-bold">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/mountain.jpg" 
          alt="Mountain Background" 
          fill
          className="object-cover brightness-75"
        />
      </div>

      {/* Services Container */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <a 
              key={index} 
              href={service.link} 
              className="w-80 bg-black/40 backdrop-blur-md rounded-lg p-6 pt-20 text-center relative 
                         hover:bg-white/60 hover:text-black transition-all duration-300 group"
            >
              {/* Icon Circle */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 
                              w-20 h-20 bg-black/40 backdrop-blur-md rounded-full 
                              flex items-center justify-center group-hover:bg-white/60 transition-all duration-300">
                <service.icon className="text-4xl text-white group-hover:text-black" />
              </div>

              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-sm font-bold">{service.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
