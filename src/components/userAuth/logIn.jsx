import React, { useEffect, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";




import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext.jsx";
import MovieSideBar from "./movieSidebar.jsx";

const LogInPage = () => {


    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const { signInUser } = UserAuth();
    const navigate = useNavigate();
  
    const handleSignIn = async (e) => {
      e.preventDefault();
      const { session, error } = await signInUser(email, password); // Use your signIn function
  
      if (error) {
        setError(error); // Set the error message if sign-in fails
  
        // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
        setTimeout(() => {
          setError("");
        }, 3000); // 3000 milliseconds = 3 seconds
      } else {
        // Redirect or perform any necessary actions after successful sign-in
        console.log("Successfully logged In");
        navigate("/");
      }
  
      if (session) {
        closeModal();
        setError(""); // Reset the error when there's a session
      }
    };


    return (

        <div className="flex justify-center object-fill fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white">
            <form onSubmit={handleSignIn} className="top-0 w-3/4 h-screen my-4 mx-4 content-center">
            <div className="">
                <h1 className="text-4xl font-extrabold">NextPick</h1>
                <p className="text-xs mt-1 font-light">Your Personal Movie Genie!</p>
                <div className="flex justify-center mt-10">
                    <Link to = "/signup"><button className="mr-1 w-34 py-1 rounded-lg bg-transparent text-[#fca311] border-2 border-[#fca311] transition duration-300 hover:scale-110">Sign Up</button></Link>
                    
                    <button className="ml-1 w-34 py-1 rounded-lg bg-[#fca311] text-black border-2 border-[#fca311] transition duration-300 hover:scale-110">Log In</button>
                </div>
                <h1 className="text-3xl mt-10 text-left px-[25%] font-bold">Welcome back</h1>
                <p className="text-sm text-[#e5e5e5] px-[25%] text-left">Enter your credentials to get started</p>
                <div className="flex flex-col  justify-center items-center">
                        <input className=" cursor-pointer w-70 mt-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="email" />
                    <div className="relative flex flex-col justify-center items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="cursor-pointer w-70 mt-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            id="password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[50%] text-slate-400 hover:text-[#fca311] transition"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    
                </div>
                <p className="text-xs text-slate-200 mt-2 px-[25%] text-left italic">forgot password?</p>
                <button className="w-70 mt-10 h-9 rounded-md bg-slate-200 font-bold text-black border-2 border-slate-200 transition duration-300 hover:scale-110">LOG IN</button>

            </div>

            </form>
            <MovieSideBar />
        </div>
    );

}

export default LogInPage;