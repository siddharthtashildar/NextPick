import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white px-6 py-2">
      {/* Header */}
      <header className="flex justify-between items-center mb-12 py-1">
        <h1 className="text-base font-bold">NextPick</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by movie, actor, genre..."
            className="bg-[#14213d] text-[#e5e5e5] px-4 py-1 rounded-full w-64 outlifne-none border border-[#e5e5e5] focus:ring-2 focus:ring-[#fca311]"
          />
          <button className="bg-[#fca311] text-[#fca311] px-6 py-1 rounded-full font-semibold hover:bg-[#ffb627] transition duration-300">
            Take Quiz
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="text-center">
        <h2 className="text-5xl font-bold leading-tight">
          Discover Your Perfect <br /> Movie with <span className="text-[#fca311]">name</span>
        </h2>
        <p className="text-lg text-[#e5e5e5] mt-4 mb-6 max-w-xl mx-auto">
          Tired of endlessly scrolling through streaming platforms, unsure of what to watch? Let NextPick help you find the perfect movie match.
        </p>
        <button className="bg-[#fca311] text-[#fca311] px-8 py-3 rounded-full font-semibold hover:bg-[#ffb627] transition duration-300">
          Start Quiz
        </button>
      </main>

      {/* Movie Thumbnails */}
      <div className="mt-12 flex justify-center gap-4 flex-wrap">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-40 h-24 bg-[#14213d] rounded-lg shadow-md"></div>
        ))}
      </div>

      {/* How It Works Section */}
      <section className="mt-16 text-center">
        <h3 className="text-3xl font-bold mb-6">How it works</h3>
        <div className="flex justify-center gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center max-w-xs">
            <div className="w-12 h-12 bg-[#fca311] rounded-full flex items-center justify-center">
              ❓
            </div>
            <h4 className="text-xl font-semibold mt-4">Take the Quiz</h4>
            <p className="text-[#e5e5e5] mt-2">
              A short quiz with 7 questions to match your preferences.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center max-w-xs">
            <div className="w-12 h-12 bg-[#fca311] rounded-full flex items-center justify-center">
              🎬
            </div>
            <h4 className="text-xl font-semibold mt-4">Get Film Picks</h4>
            <p className="text-[#e5e5e5] mt-2">
              Get personalized movie recommendations based on your responses.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center max-w-xs">
            <div className="w-12 h-12 bg-[#fca311] rounded-full flex items-center justify-center">
              🍿
            </div>
            <h4 className="text-xl font-semibold mt-4">Explore and Enjoy</h4>
            <p className="text-[#e5e5e5] mt-2">
              Sit back, relax, and enjoy your personalized picks!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;