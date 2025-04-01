import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";



import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext.jsx";
import MovieSideBar from "./movieSidebar.jsx";

const SignUpPage = () => {

    const [movies, setMovies] = useState([]);
    const [currentMovies, setCurrentMovies] = useState([]);
    const [direction, setDirection] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const { signUpNewUser } = UserAuth();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (password === confirmPassword) {
            try {
                const result = await signUpNewUser(username, email, password); // Call context function

                if (result.success) {
                    console.log("Successfully SIgned UP");

                    navigate("/uploadprofilepic"); // Navigate to dashboard on success
                } else {
                    setError(result.error.message); // Show error message on failure
                }
            } catch (err) {
                setError("An unexpected error occurred."); // Catch unexpected errors
            } finally {
                setLoading(false); // End loading state
            }
        }
        else {
            setError("Both Password dont match!")
        }

      };


    return (

        <div className="flex justify-center object-fill fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white">

            <form onSubmit = {handleSignUp} className="top-0 w-3/4 h-screen my-4 mx-4 content-center">
                <div className="">
                    <h1 className="text-4xl font-extrabold">NextPick</h1>
                    <p className="text-xs mt-1 font-light">Your Personal Movie Genie!</p>
                    <div className="flex justify-center mt-10">
                        <button className="mr-1 w-34 py-1 rounded-lg bg-[#fca311] text-black border-2 border-[#fca311] transition duration-300 hover:scale-110">Sign Up</button>
                        <Link to='/login'><button className="ml-1 w-34 py-1 rounded-lg bg-transparent text-[#fca311] border-2 border-[#fca311] transition duration-300 hover:scale-110">Log In</button> </Link>

                    </div>
                    <h1 className="text-3xl mt-10 text-left px-[25%] font-bold">Welcome </h1>
                    <p className="text-sm text-[#e5e5e5] px-[25%] text-left">Enter your new credentials to get started</p>
                    <div className="flex flex-col  justify-center items-center">
                        <input className=" cursor-pointer w-70 mt-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                                onChange={(e) => setUsername(e.target.value)}
                                type="username"
                                name="username"
                                id="username"
                                placeholder="username"/>

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
                        </div>
                        <div className="relative flex flex-col justify-center items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="cursor-pointer w-70 mt-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Confirm password"
                                onChange={(e) => setconfirmPassword(e.target.value)}
                                name="confirmpassword"
                                id="confirmpassword"
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
                    <button  type="submit" disabled={loading} className="w-70 mt-10 h-9 rounded-md bg-slate-200 font-bold text-black border-2 border-slate-200 transition duration-300 hover:scale-110">GET STARTED</button>
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                </div>
            </form>

            <MovieSideBar />
        </div>
    );

}

export default SignUpPage;