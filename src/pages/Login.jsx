import React, { useState } from "react";
import logo from "../images/logo.png";
import axios from "axios";
import { LoginState } from "../data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [user, SetUser] = useState(LoginState);
  const [disabled, setdisabled] = useState(true);
  console.log(user);

  const Email = (event) => {
    const value = event.target.value;
    SetUser({ ...user, email: value });
    if (event) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  };

  const handlerLogin = async () => {
    try {
      const response = await axios.post(
        "https://expense-tracker-task-production.up.railway.app/user/login",
        {
          email: user.email,
          password: user.password,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      const { message } = error;
      toast(message);
    }
  };

  return (
    <>
      <div className="flex overflow-hidden">
        <ToastContainer position="top-right" />
        <div className="w-[35%] h-screen flex justify-center items-center flex-col anim">
          <h1 className="text-[#1E399F] font-bold text-2xl pb-10">LOGIN</h1>
          <div className="flex flex-col">
            <input
              type="email"
              className="p-2 border-2 border-gray-400 rounded-md mb-3"
              placeholder="Enter You email"
              onChange={Email}
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="p-2  border-2 border-gray-400 rounded-md"
              onChange={(e) => SetUser({ ...user, password: e.target.value })}
            />

            <button
              type="submit"
              className={
                disabled
                  ? "text-gray-600 mt-4"
                  : "mt-3 bg-[#63D295] text-white py-2 rounded-lg"
              }
              onClick={handlerLogin}
              disabled={disabled}
            >
              Login
            </button>
          </div>
        </div>
        <div className="w-[65%] bg-[#1E399F] h-screen flex justify-center items-center text-white text-lg font-bold flex-col abc anim">
          <img src={logo} alt="" className="h-24 w-48 mb-2" />
          <h1>Welcome Back to Win</h1>
        </div>
      </div>
    </>
  );
};

export default Login;
