import React from 'react';

const Navbar = () => {

    return(
      <header className="fixed top-0 left-0 w-full h-5 flex justify-between items-center mb-12 py-1 pl-10 pr-10 mt-10 z-1000 animate-fade-up animate-once animate-ease-linear animate-fill-forwards">

        <h2 className="text-3xl font-bold">NextPick</h2>



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
            src="src\assets\pfp.JPG"
            alt="avatar"
            className="relative inline-block h-9 w-9 !rounded-full  object-cover object-center transition duration-300 hover:scale-110"
          />

        </div>

      </header>
    );

}

export default Navbar;