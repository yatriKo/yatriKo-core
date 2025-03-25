'use client';

import React, { useState } from 'react';
import { 
    FaGoogle, 
    FaFacebookF 
} from 'react-icons/fa';

const LoginPage = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="bg-gradient-to-r from-gray-200 to-[#c9d6ff] flex items-center justify-center min-h-screen font-montserrat">
            <div className={`bg-white rounded-[30px] shadow-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px] transition-all duration-600 
                ${isActive ? 'active' : ''}`}>
                {/* Sign Up Container */}
                <div className={`form-container sign-up absolute top-0 h-full transition-all duration-600 left-0 w-1/2 
                    ${isActive ? 'opacity-100 z-50 translate-x-full' : 'opacity-0 z-10'}`}>
                    <form className="bg-white flex flex-col items-center justify-center h-full px-10 py-0">
                        <h1 className="text-2xl font-bold mb-5">Create Account</h1>
                        <div className="social-icons flex my-5">
                            <a href="#" className="border border-gray-300 rounded-full flex items-center justify-center w-10 h-10 mx-1">
                                <FaGoogle />
                            </a>
                            <a href="#" className="border border-gray-300 rounded-full flex items-center justify-center w-10 h-10 mx-1">
                                <FaFacebookF />
                            </a>
                        </div>
                        <span className="text-xs my-2.5">or use your email for registration</span>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="bg-gray-100 w-full p-2.5 rounded-lg my-2 outline-none" 
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="bg-gray-100 w-full p-2.5 rounded-lg my-2 outline-none" 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="bg-gray-100 w-full p-2.5 rounded-lg my-2 outline-none" 
                        />
                        <button 
                            className="bg-[#2da0a8] text-white uppercase px-11 py-2.5 rounded-lg mt-2.5 cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Sign In Container */}
                <div className={`form-container sign-in absolute top-0 h-full left-0 w-1/2 z-20 
                    ${isActive ? '-translate-x-full' : ''}`}>
                    <form className="bg-white flex flex-col items-center justify-center h-full px-10 py-0">
                        <h1 className="text-2xl font-bold mb-5">Sign In</h1>
                        <div className="social-icons flex my-5">
                            <a href="#" className="border border-gray-300 rounded-full flex items-center justify-center w-10 h-10 mx-1">
                                <FaGoogle />
                            </a>
                            <a href="#" className="border border-gray-300 rounded-full flex items-center justify-center w-10 h-10 mx-1">
                                <FaFacebookF />
                            </a>
                        </div>
                        <span className="text-xs my-2.5">or use your email password</span>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="bg-gray-100 w-full p-2.5 rounded-lg my-2 outline-none" 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="bg-gray-100 w-full p-2.5 rounded-lg my-2 outline-none" 
                        />
                        <a href="#" className="text-xs my-2.5">Forget Your Password?</a>
                        <button 
                            className="bg-[#2da0a8] text-white uppercase px-11 py-2.5 rounded-lg mt-2.5 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Toggle Container */}
                <div className={`toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 
                    ${isActive ? '-translate-x-full rounded-r-[150px]' : 'rounded-l-[150px]'} z-[1000]`}>
                    <div className={`toggle bg-gradient-to-r from-[#96a82d] to-[#96a82d] absolute left-[-100%] h-full w-[200%] transition-all duration-600 
                        ${isActive ? 'translate-x-1/2' : ''}`}>
                        {/* Left Toggle Panel */}
                        <div className={`toggle-panel toggle-left absolute w-1/2 h-full flex flex-col items-center justify-center text-center px-8 py-0 
                            ${isActive ? 'translate-x-0' : '-translate-x-[200%]'} transition-all duration-600`}>
                            <h1 className="text-2xl font-bold text-white">Yatri को</h1>
                            <p className="text-sm text-white my-5">
                                Enter your personal details to use all of site features
                            </p>
                            <button 
                                onClick={() => setIsActive(false)}
                                className="bg-transparent border border-white text-white uppercase px-11 py-2.5 rounded-lg mt-2.5 cursor-pointer"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Right Toggle Panel */}
                        <div className={`toggle-panel toggle-right absolute right-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-8 py-0 
                            ${isActive ? 'translate-x-[200%]' : 'translate-x-0'} transition-all duration-600`}>
                            <h1 className="text-2xl font-bold text-white">Yatri को</h1>
                            <p className="text-sm text-white my-5">
                                Register with your personal details to use all of site features
                            </p>
                            <button 
                                onClick={() => setIsActive(true)}
                                className="bg-transparent border border-white text-white uppercase px-11 py-2.5 rounded-lg mt-2.5 cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;