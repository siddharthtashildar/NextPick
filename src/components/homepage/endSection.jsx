
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle, FaFilm } from "react-icons/fa";
import { GiPopcorn } from "react-icons/gi";
import { Link } from "react-router-dom";

import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { FaDatabase } from "react-icons/fa";
import { MdLightbulbOutline } from "react-icons/md";

const steps = [
  {
    icon: <FaQuestionCircle className="text-4xl text-red-500" />,
    title: "Take the Quiz",
    description: "A short quiz with questions to match your preferences.",
  },
  {
    icon: <FaFilm className="text-4xl text-purple-500" />,
    title: "Get Film Picks",
    description:
      "Receive personalized movie recommendations based on your answers.",
  },
  {
    icon: <GiPopcorn className="text-4xl text-yellow-400" />,
    title: "Explore and Enjoy",
    description: "Sit back, relax, and enjoy your personalized movie picks!",
  },
];



const EndSection = () => {
  return (
    <>
      <div className=" text-white mt-48 py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col justify-items-center justify-center bg-white/5 border border-white/10 rounded-2xl  p-8 backdrop-blur-md shadow-lg"
            >
              <div className="mb-4 flex flex-row justify-center ">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <Link to='/quiz'>
          <button className="bg-[#fca311] mt-16 text-black px-9 py-3 rounded-md font-semibold hover:bg-[#ffb627] transition duration-300 hover:scale-110">
            Quick Pick
          </button>
        </Link>
      </div>

    </>
  );
}

export default EndSection;