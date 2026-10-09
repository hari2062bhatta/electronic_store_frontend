import { MdEmail } from "react-icons/md"; 
import { RiLockPasswordFill } from "react-icons/ri"; 
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.jpg"; 
import { useState } from "react"; 
import Api from "../config/api"; 
import toast from "react-hot-toast"; 

const Login = () => { 
  const navigate = useNavigate(); 
  // Initializing with "" prevents uncontrolled input warnings
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 

  // Fixed event type here
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
    if (!email.trim() || !password.trim()) { 
      return toast.error("Please fill both fields"); 
    } 
    try { 
      const response = await Api.post("/api/user/login", { email, password }); 
      console.log(response); 
      if (response.data.success) { 
        toast.success("User logged in successfully");
        navigate("/dashboard"); // Optional: redirect on success
        return;
      } else { 
        return toast.error("Login failed"); 
      } 
    } catch (err) { 
      console.log(err); 
      toast.error("Something went wrong");
    } 
  }; 

  return ( 
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4"> 
      <div className="flex w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-xl"> 
        {/* Left Side */} 
        <div className="relative flex w-[42%] flex-col items-center justify-center bg-[#0C6967] px-6 text-white"> 
          {/* Logo */} 
          <div className="absolute top-5 left-5 h-10 w-10 overflow-hidden rounded-full border-2 border-white"> 
            <img className="h-full w-full object-cover" src={logo} alt="logo" /> 
          </div> 
          <div className="text-center"> 
            <h1 className="font-['Allura'] text-5xl"> Hello Friend! </h1> 
            <p className="mt-3 text-sm leading-6 text-gray-100"> 
              Enter your personal details <br /> and start your journey with us. 
            </p> 
            <button 
              onClick={() => navigate("/register")} 
              className="mt-7 rounded-full border border-white px-8 py-2 text-sm font-semibold transition hover:bg-white hover:text-[#0C6967]"
            > 
              SIGN UP 
            </button> 
          </div> 
        </div> 

        {/* Right Side */} 
        <div className="flex w-[58%] flex-col justify-center px-8 py-6"> 
          <h1 className="text-center font-['Allura'] text-4xl text-[#0C6967]"> Welcome Back </h1> 
          <p className="mt-1 text-center text-sm text-gray-400"> Login to continue to your account </p> 
          
          <form onSubmit={loginUser} className="mt-6 flex flex-col gap-3"> 
            {/* Email */} 
            <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2.5 text-gray-500 transition focus-within:ring-2 focus-within:ring-[#0C6967]"> 
              <MdEmail className="text-lg" /> 
              <input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                type="email" 
                value={email} 
                placeholder="Email" 
                className="w-full bg-transparent text-sm outline-none" 
              /> 
            </div> 

            {/* Password */} 
            <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2.5 text-gray-500 transition focus-within:ring-2 focus-within:ring-[#0C6967]"> 
              <RiLockPasswordFill className="text-lg" /> 
              <input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                value={password} 
                type="password" 
                placeholder="Password" 
                className="w-full bg-transparent text-sm outline-none" 
              /> 
            </div> 

            {/* Forgot Password */} 
            <div className="text-right"> 
              <span className="cursor-pointer text-xs text-gray-500 hover:text-[#0C6967]"> Forgot Password? </span> 
            </div> 

            {/* Login Button */} 
            <button type="submit" className="mt-2 rounded-lg bg-[#D95103] py-2.5 text-sm font-semibold text-white transition hover:bg-[#b94302]" > 
              LOGIN 
            </button> 
          </form> 

          <p className="mt-5 text-center text-sm text-gray-500"> 
            Don't have an account? 
            <span onClick={() => navigate("/register")} className="ml-1 cursor-pointer font-semibold text-[#0C6967]"> Sign Up </span> 
          </p> 
        </div> 
      </div> 
    </div> 
  ); 
}; 

export default Login;