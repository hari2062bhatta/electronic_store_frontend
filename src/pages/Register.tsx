import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Api from "../config/api";
import { useState } from "react";
import logo from "../assets/logo.jpg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface User {
  fullName: string;
  address: string;
  contact: string;
  password: string;
  confirm_password: string;
  email: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User>({
    fullName: "",
    address: "",
    contact: "",
    password: "",
    confirm_password: "",
    email: "",
  });

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !users.fullName.trim() ||
      !users.address.trim() ||
      !users.email.trim() ||
      !users.contact.trim() ||
      !users.password.trim() ||
      !users.confirm_password.trim()
    ) {
      return toast.error("Please fill in all fields");
    }

    if (users.password !== users.confirm_password) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await Api.post("/api/user/create", {
        fullName: users.fullName,
        password: users.password,
        address: users.address,
        contact: users.contact,
        email: users.email,
      });

      if (response.data.success) {
        toast.success("User registered successfully");
        navigate("/login");
      } else {
        toast.error("User registration failed");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-5xl min-h-[600px] overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Left Side */}
        <div className="relative flex w-[45%] flex-col items-center justify-center bg-[#0C6967] px-8 text-white">

          <div className="absolute top-6 left-6 h-12 w-12 overflow-hidden rounded-full border-2 border-white">
            <img
              className="h-full w-full object-cover"
              src={logo}
              alt="logo"
            />
          </div>

          <div className="text-center">
            <h1 className="font-['Allura'] text-6xl">
              Welcome Back
            </h1>

            <p className="mt-4 text-sm leading-6 text-gray-100">
              To keep connected with us please
              <br />
              login with your personal info.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-8 rounded-full border border-white px-8 py-2 text-sm font-semibold transition hover:bg-white hover:text-[#0C6967]"
            >
              SIGN IN
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-[55%] flex-col justify-center px-10 py-8">

          <h1 className="text-center font-['Allura'] text-5xl text-[#0C6967]">
            Create Account
          </h1>

          <p className="mt-1 text-center text-sm text-gray-400">
            Create your account to get started
          </p>

          <form
            onSubmit={registerUser}
            className="mt-7 flex flex-col gap-3"
          >
            {/* Name */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-500 transition focus-within:ring-2 focus-within:ring-[#0C6967]">
              <IoPerson className="text-lg" />
              <input
                value={users.fullName}
                onChange={changeValue}
                name="fullName"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Full name"
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-500 transition focus-within:ring-2 focus-within:ring-[#0C6967]">
              <MdEmail className="text-lg" />
              <input
                value={users.email}
                onChange={changeValue}
                name="email"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Email"
                type="email"
                autoComplete="email"
              />
            </div>

            {/* Address */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-500 transition focus-within:ring-2 focus-within:ring-[#0C6967]">
              <CiLocationOn className="text-xl" />
              <input
                value={users.address}
                onChange={changeValue}
                name="address"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Address"
                autoComplete="street-address"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-500 transition focus-within:ring-2 focus-within:ring-[#0C6967]">
              <FaPhoneAlt className="text-sm" />
              <input
                value={users.contact}
                onChange={changeValue}
                name="contact"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Contact number"
                type="tel"
                autoComplete="tel"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-500 transition focus-within:ring-2 focus-within:ring-[#0C6967]">
              <RiLockPasswordFill className="text-lg" />
              <input
                value={users.password}
                onChange={changeValue}
                name="password"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Password"
                type="password"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-500 transition focus-within:ring-2 focus-within:ring-[#0C6967]">
              <RiLockPasswordFill className="text-lg" />
              <input
                value={users.confirm_password}
                onChange={changeValue}
                name="confirm_password"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Confirm password"
                type="password"
                autoComplete="new-password"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="mt-3 cursor-pointer rounded-lg bg-[#D95103] py-3 text-sm font-semibold text-white transition hover:bg-[#b94302]"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-1 cursor-pointer font-semibold text-[#0C6967]"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;