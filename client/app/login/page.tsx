"use client";

import React, { useEffect, useState } from "react";
import AxiosInstance from "../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import { toast } from "sonner";

const userLogin = async (email: string, password: string) => {
  const response = await AxiosInstance.post("/auth/login", { email, password });
  return response.data;
};

const userSignUp = async (
  name: string,
  email: string,
  phoneNumber: string,
  password: string
) => {
  const response = await AxiosInstance.post("/auth/sign-up", {
    name,
    email,
    phoneNumber,
    password,
  });
  return response;
};

const YatriLoginPage = () => {
  const router = useRouter();
  const { token, setToken } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSignupSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoginError(false);
      const data = await userSignUp(
        signUpName,
        signUpEmail,
        signUpPhone,
        signUpPassword
      );
      toast(`User ${data.data.name} created successfully!`);
      setIsActive(false);
    } catch (error) {
      setLoginError(true);
      toast(error?.response.data.message);
      console.log(error);
    }
  };

  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoginError(false);
      const data = await userLogin(loginEmail, loginPass);
      setToken(data.accessToken);
      router.push("/");
    } catch (error) {
      setLoginError(true);
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     router.replace("/");
  //   }
  // }, [token, router]);

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div
        className={`bg-white rounded-3xl shadow-lg relative overflow-hidden w-full max-w-3xl min-h-[480px] ${
          isActive ? "active" : ""
        }`}
      >
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${
            isActive ? "translate-x-full opacity-100 z-10" : "opacity-0 z-1"
          } left-0 w-1/2`}
        >
          <div className="bg-white flex items-center justify-center flex-col px-10 h-full">
            <h1 className="text-[#264653] text-xl font-bold mb-4">
              Create Account
            </h1>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                placeholder="Name"
                className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"
                onChange={(e) => setSignUpName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"
                onChange={(e) => setSignUpPhone(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"
                onChange={(e) => setSignUpPassword(e.target.value)}
              />

              <button className="bg-[#264653] text-white text-xs py-2 px-10 border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-2 cursor-pointer">
                Sign Up
              </button>
            </form>
          </div>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${
            isActive ? "translate-x-full" : ""
          } left-0 w-1/2 z-2`}
        >
          <div className="bg-white flex items-center justify-center flex-col px-10 h-full">
            <h1 className="text-[#264653] text-xl font-bold mb-4">Log in</h1>
            <div
              className={`p-2 border border-red-500 w-full mb-4 text-center text-[#ff0000] ${
                !loginError && "hidden"
              }`}
            >
              Invalid Credentials
            </div>
            <form onSubmit={handleLoginSubmit}>
              <input
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setLoginEmail(e.target.value)}
                className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"
              />
              <input
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setLoginPass(e.target.value)}
                className="bg-[#eee] border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black"
              />

              <button
                // disabled={!(loginEmail && loginPass)}
                className="bg-[#264653] text-white text-xs py-2 px-10 border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-2 cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        {/* Toggle Container */}
        <div
          className={`absolute top-0 ${
            isActive
              ? "translate-x-[-100%] rounded-r-[150px] rounded-l-none"
              : "rounded-l-[150px] rounded-r-none"
          } left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out z-50`}
        >
          <div
            className={`bg-[#264653] h-full relative ${
              isActive ? "translate-x-1/2" : "translate-x-0"
            } left-[-100%] w-[200%] transition-all duration-600 ease-in-out`}
          >
            {/* Toggle Left Panel */}
            <div
              className={`absolute w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0 ${
                isActive ? "translate-x-0" : "translate-x-[-200%]"
              } transition-all duration-600 ease-in-out`}
            >
              <h1 className="text-[#FEFAE0] text-2xl font-semibold font-serif italic mb-4">
                Yatri को
              </h1>
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
            <div
              className={`absolute w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0 right-0 ${
                isActive ? "translate-x-[200%]" : "translate-x-0"
              } transition-all duration-600 ease-in-out`}
            >
              <h1 className="text-[#FEFAE0] text-2xl font-semibold font-serif italic mb-4">
                Yatri को
              </h1>
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
