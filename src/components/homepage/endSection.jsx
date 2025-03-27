import React from "react";



const EndSection = () =>{
    return(
        <section className="mt-56 text-center">
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
    );
}

export default EndSection;