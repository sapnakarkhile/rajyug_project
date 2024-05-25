import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Group 1000002977.png";
import user_register_img from "../../assets/login illustration 1.png";

const RegistrationForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        // Handle password mismatch error
        console.error("Passwords do not match");
        return;
      }

      const response = await axios.post(
        "http://localhost:8002/api/user/register",
        {
          fullName,
          email,
          password,
          // role // Sending the role field with the correct name
        }
      );

      if (response.status === 200) {
        // Registration successful, redirect to login page
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <div className="flex border border-black rounded overflow-hidden w-full h-screen">
      {/* Left side of the screen */}
      <div
        className="w-1/2 p-5 bg-white"
        style={{
          top: "114px",
          left: "44px",
          width: "768px",
          height: "1024px",
          gap: "0px",
        }}>
        <img
          src={user_register_img}
          alt="Image"
          className="object-cover"
          style={{
            width: "500px",
            height: "400px",
            marginTop: "3%",
            marginLeft: "10%",
          }}
        />
        <div className="mt-4 text-center">
          <h2 className="font-bold text-lg">Already Have An Account?</h2>
          <p>Continue using your Email and Password</p>
        </div>
        <button className="font-bold py-2 px-4 rounded mt-4 border-2 border-blue-200 hover:border-blue-700 text-blue-500 hover:text-blue-700 bg-white hover:bg-white w-96 text-center mx-auto block">
          Login
        </button>
      </div>

      {/* Right side of the screen */}
      <div
        className="w-1/2 p-10 h-screen"
        style={{ backgroundColor: "#EEFDFF" }}>
        <img
          src={logo}
          alt="Image"
          className="object-cover mx-auto block"
          style={{
            width: "30px",
            height: "30px",
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
          }}>
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
            width: "141px",
            height: "43px",
            left: "200px",
          }}>
          Register
        </h1>

        <p
          style={{
            fontFamily: "Open Sans",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "30px",
            textAlign: "center",
            width: "300px",
            height: "50px",
            position: "relative",
            left: "50%",
            marginBottom: "1%",
            transform: "translateX(-50%)",
            color: "#8a92a6",
          }}>
          Create your User account
        </p>

        <form className="mt-auto" onSubmit={handleSubmit}>
          <div class="flex items-center border border-gray-300 rounded py-2 px-3 mb-4 bg-transparent">
            <i class="fas fa-user text-gray-500 mr-2"></i>
            <input
              class="w-full focus:outline-none bg-transparent"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div class="flex items-center border border-gray-300 rounded py-2 px-3 mb-4 bg-transparent">
            <i class="fa-solid fa-envelope text-gray-500 mr-2"></i>
            <input
              class="w-full focus:outline-none bg-transparent"
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div class="flex items-center justify-between border border-gray-300 rounded py-2 px-3 mb-4 bg-transparent">
            <div class="flex items-center">
              <i class="fa-solid fa-lock text-gray-500 mr-2"></i>
              <input
                class="w-full focus:outline-none bg-transparent"
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <i class="fa-regular fa-eye text-gray-500 "></i>
          </div>

          <div class="flex items-center justify-between border border-gray-300 rounded py-2 px-3 mb-4 bg-transparent">
            <div class="flex items-center">
              <i class="fa-solid fa-lock text-gray-500 mr-2"></i>
              <input
                class="w-full focus:outline-none bg-transparent"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <i class="fa-regular fa-eye text-gray-500 "></i>
          </div>
          <button
            className="text-white font-bold py-2 px-4 rounded w-full mx-auto block"
            style={{
              backgroundColor: "#17D2EB",
              width: "400px",
              height: "50px",
            }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
