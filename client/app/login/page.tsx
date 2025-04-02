"use client";

import React, { useState } from "react";

const YatriLoginPage = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSignupSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Sign Up button clicked");
  };

  const handleLoginSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Login button clicked");
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div className={`bg-white rounded-3xl shadow-lg relative overflow-hidden w-full max-w-3xl min-h-[480px] ${isActive ? 'active' : ''}`}>
        
        {/* Sign Up Form */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${isActive ? 'translate-x-full opacity-100 z-10' : 'opacity-0 z-1'} left-0 w-1/2`}>
          <div className="bg-white flex items-center justify-center flex-col px-10 h-full">
            <h1 className="text-[#264653] text-xl font-bold mb-4">Create Account</h1>
            <input type="text" placeholder="Name" className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"/>
            <input type="email" placeholder="Email" className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"/>
            <input type="text" placeholder="Age" className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"/>
            <input type="password" placeholder="Password" className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"/>
            
            <button 
              onClick={handleSignupSubmit} 
              className="bg-[#264653] text-white text-xs py-2 px-10 border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-2 cursor-pointer"
            >
              Sign Up
            </button>

            <div className="flex flex-col items-start mt-2">
              <label className="flex items-center text-sm gap-2 mb-1 text-black">
                <input type="checkbox" name="role" value="traveler" className="w-4 h-4" /> Traveler
              </label>
              <label className="flex items-center text-sm gap-2 text-black">
                <input type="checkbox" name="role" value="guesthouse-owner" className="w-4 h-4" /> Guesthouse owner
              </label>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${isActive ? 'translate-x-full' : ''} left-0 w-1/2 z-2`}>
          <div className="bg-white flex items-center justify-center flex-col px-10 h-full">
            <h1 className="text-[#264653] text-xl font-bold mb-4">ENTER TO LOG IN</h1>
            <input type="text" placeholder="Name" className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"/>
            <input type="email" placeholder="Email" className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"/>
            <input type="password" placeholder="Password" className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"/>
            
            <button 
              onClick={handleLoginSubmit} 
              className="bg-[#264653] text-white text-xs py-2 px-10 border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-2 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>

        {/* Toggle Container */}
        <div className={`absolute top-0 ${isActive ? 'translate-x-[-100%] rounded-r-[150px] rounded-l-none' : 'rounded-l-[150px] rounded-r-none'} left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out z-50`}>
          <div className={`bg-[#264653] h-full relative ${isActive ? 'translate-x-1/2' : 'translate-x-0'} left-[-100%] w-[200%] transition-all duration-600 ease-in-out`}>

            {/* Toggle Left Panel */}
            <div className={`absolute w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0 ${isActive ? 'translate-x-0' : 'translate-x-[-200%]'} transition-all duration-600 ease-in-out`}>
              <h1 className="text-[#FEFAE0] text-2xl font-semibold font-serif italic mb-4">Yatri को</h1>
              <p className="text-white text-sm leading-5 tracking-wide my-5">
                Enter your personal details to use all of site features
              </p>
              <button 
                onClick={handleLoginClick} 
                className="bg-transparent text-white text-xs py-2 px-10 border border-white rounded-lg font-semibold tracking-wider uppercase mt-2 cursor-pointer"
              >
                LOGIN
              </button>
            </div>

            {/* Toggle Right Panel */}
            <div className={`absolute w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0 right-0 ${isActive ? 'translate-x-[200%]' : 'translate-x-0'} transition-all duration-600 ease-in-out`}>
              <h1 className="text-[#FEFAE0] text-2xl font-semibold font-serif italic mb-4">Yatri को</h1>
              <p className="text-white text-sm leading-5 tracking-wide my-5">
                Register with your personal details to use all of site features
              </p>
              <button 
                onClick={handleRegisterClick} 
                className="bg-transparent text-white text-xs py-2 px-10 border border-white rounded-lg font-semibold tracking-wider uppercase mt-2 cursor-pointer"
              >
                SIGN UP
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default YatriLoginPage;
