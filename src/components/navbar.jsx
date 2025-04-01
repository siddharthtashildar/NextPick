
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

import { IoTriangle } from "react-icons/io5";

const Navbar = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

    // Function to fetch the profile picture
    const fetchProfilePicture = async () => {
      if (!session) return; // Check if user is logged in
  
      const userId = session.user.id; // Get user ID
      const { data } = supabase.storage
        .from("avatars") // Your storage bucket name
        .getPublicUrl(`profile_${userId}.jpg`); // Assuming you saved it as profile_userId.jpg
  
      setProfileImage(data.publicUrl); // Update state
    };

    useEffect(() => {
      fetchProfilePicture();
    }, [session]); // Fetch only when session changes

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut();
      navigate("/login");
    } catch (err) {
      setError("An unexpected error occurred."); // Catch unexpected errors
    }
  };
  console.log(session);


  useEffect(() => {
    function handleClickOutside(event) {
      // Ensure the click is outside BOTH dropdown and profile icon
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    // Attach event listener when dropdown is open
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

    return(
      <header className="fixed top-0 left-0 w-full h-5 flex justify-between items-center mb-12 py-1 pl-10 pr-10 mt-10 z-1000 animate-fade-up animate-once animate-ease-linear animate-fill-forwards">
        
        <h2 className="text-3xl font-extrabold">NextPick</h2>
     
          <div className="relative text-gray-600 focus-within:text-gray-400 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </span>
            <input type="search" name="q" className="py-2 w-130 h-9 text-sm text-white bg-gray-900 opacity-75 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search by movie, actor, genre..." autocomplete="off" />
          </div>

 
      

        <div className="flex items-center gap-4">

          <button className="bg-[#fca311] text-black px-6 py-1 rounded-md font-semibold hover:bg-[#ffb627] transition duration-300 hover:scale-110">
            Take Quiz
          </button>

          <img
          ref={profileIconRef} 
            src={session?.user?.user_metadata?.profile_picture || "../src/assets/defaultpfp.jpg"}
          
            alt="avatar"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative inline-block h-9 w-9 !rounded-full object-cover cursor-pointer object-center transition duration-300 hover:scale-110"
          />
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
            
            <div ref={dropdownRef} className="absolute right-10 mt-58 w-58 text-white bg-gray-900 opacity-75 shadow-lg rounded-md overflow-hidden">
              <div className="px-4 py-2 border-b-2 border-slate-700 ">
                <p className="text-md text-left  font-semibold">{session?.user?.user_metadata?.username || 'Guest' }</p>
                <p className="text-xs italic  text-left  font-semibold">{session?.user?.email}</p>
              </div>
              <Link to="/profile" className="block px-4 py-2 border-2 border-gray-900 hover:border-[#fca311] flex justify-left items-center  "> <FaRegUser className="mr-3" /> Profile</Link>
              <Link to="/settings" className="block px-4 py-2 border-2 border-gray-900 hover:border-[#fca311] flex justify-left items-center  "> <IoSettingsOutline className="mr-3" /> Settings</Link>
              <button
                className="w-full flex justify-left items-center  text-center px-4 py-2 text-red-600 border-2 border-gray-900 hover:border-red-600"
                onClick={handleSignOut}
              >
                <MdLogout className="mr-3" />
                Logout
                
              </button>
            </div>
            </>
          )}
        </div>

      </header>
    );

}

export default Navbar;