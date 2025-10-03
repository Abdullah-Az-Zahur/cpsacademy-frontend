"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MobileApp = () => {
  return (
    <div className="py-6 md:py-10 lg:py-12 px-4 container mx-auto text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Grow your data skills with LMS for Mobile
        </p>
        <p className="text-gray-200 my-4 md:my-5 lg:my-6 text-sm sm:text-base md:text-lg px-2 sm:px-0">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          modi!
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center mt-6 md:mt-8">
          {/* App Store Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="block"
          >
            <Image
              src={"/images/home/icon/Apple.png"}
              alt="Apple store"
              width={120}
              height={40}
              className="w-32 sm:w-36 md:w-40 h-auto"
              style={{ height: "auto" }}
            />
          </motion.a>

          {/* Google Play Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="block"
          >
            <Image
              src={"/images/home/icon/Google.png"}
              alt="Google play"
              width={120}
              height={40}
              className="w-32 sm:w-36 md:w-40 h-auto"
              style={{ height: "auto" }}
            />
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
