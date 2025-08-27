"use client"
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const HeroSection = () => {
  // Animation variants for grid cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animation variants for text section
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  // Hover animation for cards
  const hoverCard = {
    hover: { scale: 1.02, boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" },
  };

  // Button animation
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="hero-lg w-full bg-orange-300 py-6 !mx-0 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-5">
      {/* Top row */}
      <div className="hero-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6 sm:mb-8 lg:mb-10">
        {/* Left big card */}
        <motion.div
          className="bg-white rounded-xl overflow-hidden shadow-sm transition relative"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          {...hoverCard}
        >
          <img
            src="/images/image1.png"
            alt="Elegance Embodied Dress"
            className="hero-img w-full h-[200px] sm:h-[250px] md:h-[450px] lg:h-[520px] object-cover"
          />
          <div className="absolute bottom-4 p-3 sm:p-4">
            <h3 className="text-gray-800 font-medium text-sm sm:text-base">Elegance Embodied Dress</h3>
            <p className="text-xs sm:text-sm text-gray-500">$199.99</p>
          </div>
        </motion.div>

        {/* Middle stacked cards */}
        <div className="flex flex-row gap-4 flex-wrap sm:flex-col">
          {/* Top solid card */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-sm transition flex-1 flex flex-col min-w-[150px]"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            {...hoverCard}
          >
            <img
              src="/images/image5.png"
              alt="Simplicity Blouse"
              className="w-full h-auto object-cover flex-1"
            />
          </motion.div>

          {/* Bottom image card */}
          <motion.div
            className="bg-orange-200 rounded-xl flex flex-col justify-center items-center text-center p-4 sm:p-6 flex-1 min-w-[150px]"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            {...hoverCard}
          >
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800">
              Comprehensive Guide To The World Of Fashion
            </h3>
            <p className="hero-text text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mt-2">1000+</p>
          </motion.div>
        </div>

        {/* Right big card */}
        <motion.div
          className="bg-orange-100 rounded-lg text-center flex-1 m-2 sm:m-2.5"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          {...hoverCard}
        >
          <img
            src="/images/men2.png"
            alt="Simplicity Blouse"
            className="hero-img w-full h-[280px] rounded-2xl sm:h-[250px] md:h-[450px] lg:h-[500px] object-cover"
          />
        </motion.div>
      </div>

      {/* Bottom text */}
      <motion.div
        className="text-center max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-gray-900">
          <span className="italic">Harmonizing</span> Your Style <br />
          and <span className="italic">Craftsmanship</span>
        </h1>
        <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">
          Where Fashion Meets Craftsmanship — Uniting Impeccable Detailing with Your Unique Style
        </p>
        <motion.button
          className="mt-4 sm:mt-6 bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition text-sm sm:text-base"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Shop Now →
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;