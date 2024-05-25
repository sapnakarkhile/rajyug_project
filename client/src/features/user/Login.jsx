import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from "../../assets/Group 1000002977.png";
import login_img from "../../assets/Mobile login-pana 1.png";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8002/api/user/login', {
        email,
        password
      });

      if (response.status === 200) {
        const { accessToken, refreshToken, user } = response.data;

        Cookies.set('accessToken', accessToken, { expires: 7 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });

        // Save user data to state or local storage

        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <div className="flex border border-black rounded overflow-hidden w-full h-screen">
      {/* Left side of the screen */}
      <div className="w-1/2 p-5 bg-white">
        <img
          src={login_img}
          alt="Login Image"
          className="object-cover"
          style={{
            width: "500px",
            height: "400px",
            marginTop: "3%",
            marginLeft: "10%"
          }}
        />
        <div className="mt-4 text-center">
          <h2 className="font-bold text-lg">Don't Have An Account?</h2>
          <p>Get Started By Creating Your New Account</p>
        </div>
        <button className="py-2 px-4 rounded mt-4 border-2 border-blue-200 hover:border-blue-400 text-blue-500 hover:text-blue-700 bg-white hover:bg-white w-96 text-center mx-auto block">
          Register
        </button>
      </div>

      {/* Right side of the screen */}
      <div className="w-1/2 p-10 h-screen" style={{ backgroundColor: "#EEFDFF" }}>
        <img
          src={logo}
          alt="Logo"
          className="object-cover mx-auto block"
          style={{
            width: "100px",
            height: "100px",
            marginLeft: "40%"
          }}
        />
        <h2
          style={{
            fontFamily: "Italiana",
            fontSize: "55.23px",
            fontWeight: 400,
            textAlign: "center",
            width: "207px",
            height: "65px",
            top: "179.45px",
            left: "992px",
            marginLeft: "30%",
            color: "#17D2EB",
            marginBottom: "5%"
          }}
        >
          JnesisIDT
        </h2>

        <h1
          style={{
            fontFamily: "Poppins",
            fontSize: "33px",
            fontWeight: 700,
            lineHeight: "42.9px",
            textAlign: "center",
            position: "relative",
            width: "140px",
            height: "43px",
            left: "170px",
            marginBottom: "10%"
          }}
        >
          Welcome
        </h1>

        {/* Login form */}
        <form className="mt-auto" onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="flex items-center border border-gray-300 rounded py-2 px-3 mb-4 bg-transparent">
            <i className="fa-solid fa-envelope text-gray-500 mr-2"></i>
            <input
              className="w-full focus:outline-none bg-transparent"
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="flex items-center justify-between border border-gray-300 rounded py-2 px-3 mb-4 bg-transparent">
            <div className="flex items-center">
              <i className="fa-solid fa-lock text-gray-500 mr-2"></i>
              <input
                className="w-full focus:outline-none bg-transparent"
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <i className="fa-regular fa-eye text-gray-500 "></i>
          </div>

          {/* Forgot password link */}
          <a href="#" style={{ color: "#E24329", marginLeft: "70%" }} className="self-start">
            Forgot password?
          </a>

          {/* Submit button */}
          <button
            type="submit"
            className="text-white py-2 px-4 rounded w-full mx-auto block"
            style={{
              backgroundColor: "#17D2EB",
              width: "400px",
              height: "50px",
              marginTop: "2%"
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
