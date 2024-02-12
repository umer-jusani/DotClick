import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { SignUpstate } from "../data";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setuser] = useState(SignUpstate);
  const [isdisabled, setisdisabled] = useState(true);
  const [SuccessMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  console.log(SuccessMsg);

  //username
  const handleUsername = (event) => {
    const value = event.target.value;
    setuser({ ...user, username: value });

    if (value) {
      setisdisabled(false);
    } else {
      setisdisabled(true);
    }
  };

  const handleSubmit = async () => {
    const data = await axios
      .post(
        "https://expense-tracker-task-production.up.railway.app/user/register",
        {
          username: user.username,
          email: user.email,
          password: user.password,
        }
      )
      .then((res) => {
        setSuccessMsg(res.data.data);
        console.log(res.data);
        toast(res.data.data);
        setTimeout(() => {
          navigate("/login");
        }, [2000]);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        localStorage.setItem("password", user.password);
      })
      .catch((err) => {
        console.log(err);
        toast("SomeThing Went Wrong");
      });
  };

  return (
    <div className="flex overflow-hidden">
      <ToastContainer position="top-right" />
      <div className=" w-[35%] h-screen flex justify-center items-center flex-col anim">
        <h1 className="text-[#1E399F] font-bold text-3xl pb-10">SIGNUP</h1>
        <div className="flex flex-col">
          <input
            type="text"
            className="p-2 border-2 border-gray-400 rounded-md mb-3"
            placeholder="Enter You Username"
            onChange={handleUsername}
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            className="p-2 border-2 border-gray-400 rounded-md mb-3"
            onChange={(e) => setuser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="p-2 border-2 border-gray-400 rounded-md mb-3"
            onChange={(e) => setuser({ ...user, password: e.target.value })}
          />

          <button
            className={
              isdisabled
                ? "text-gray-600 mt-3"
                : "mt-3 bg-[#286b21] text-white py-2 rounded-lg"
            }
            disabled={isdisabled}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="w-[65%] bg-[#1E399F] h-screen flex justify-center items-center text-white text-lg font-bold flex-col abc anim">
        <img src={logo} alt="" className="h-24 w-48 mb-2" />
        <h1>Welcome Back to Win</h1>
      </div>
    </div>
  );
};

export default Signup;
