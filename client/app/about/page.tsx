import React from 'react';

const DiscoverJourney = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-4xl mx-auto p-5 text-center text-[#264653]">
        <h1 className="text-4xl mb-5 font-bold font-['Nirmala_UI',sans-serif]">DISCOVER OUR JOURNEY</h1>
        
        <div className="grid grid-cols-[1fr_auto_1fr] gap-5 items-center">
          <div className="text-center">
            <img 
              src="/images/destination.png" 
              alt="Travel Destination" 
              className="w-full h-auto rounded-lg"
            />
            <p className="font-bold mt-2.5">Search travel destinations</p>
          </div>
          
          <div className="[writing-mode:vertical-rl] [text-orientation:upright] text-base font-bold">
            ONE TRAVEL PLATFORM
          </div>
          
          <div className="flex flex-col gap-5">
            <div className="text-center">
              <img 
                src="/images/bus.png" 
                alt="Bus" 
                className="w-full h-auto rounded-lg"
              />
              <p className="font-bold mt-2.5">Book your bus</p>
            </div>
            
            <div className="text-center">
              <img 
                src="/images/house.png" 
                alt="Guesthouse" 
                className="w-full h-auto rounded-lg"
              />
              <p className="font-bold mt-2.5">Book your guesthouse</p>
            </div>
          </div>
        </div>
        
        <p className="text-lg font-bold font-['Newsreader',serif] mt-8">
          Yatriको make travel simple and hassle-free with easy bookings for destinations, guesthouses, and bus seats. <br />
          Our goal is to provide seamless experiences so you can focus on creating unforgettable memories.
        </p>
      </div>
    </div>
  );
};

export default DiscoverJourney;