"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import banner1 from "../../../../public/images/banner/banner1.jpg";
import rectangle from "../../../../public/images/banner/Rectangle.png";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SearchBar from "@/components/Search/SearchBar";
import {
  containerStagger,
  fadeInUp,
  slideInLeft,
  slideRight,
} from "@/components/animations/variants";

const Banner: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log("Searching for", query);
  };

  return (
    <div className="w-full overflow-hidden mt-5">
      <motion.section
        className="flex flex-col md:flex-row gap-8 md:gap-10 px-4 md:px-8 lg:px-12 xl:px-16"
        variants={containerStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="md:w-1/2 font-bold my-auto order-1 md:order-1 mt-5"
          variants={slideInLeft}
        >
          <motion.div className="flex flex-col" variants={containerStagger}>
            <motion.div className="flex space-x-2 w-full" variants={fadeInUp}>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl my-auto">
                LEARN
              </span>
              <Image
                src={rectangle}
                alt="Rectangle"
                height={120}
                width={120}
                className="py-5 items-center hidden sm:block"
                style={{
                  height: "auto",
                  width: "clamp(80px, 15vw, 200px)",
                }}
              />
            </motion.div>
            <span className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              YOUR WAY
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row md:gap-5 lg:gap-8 xl:gap-20 md:mt-4"
            variants={containerStagger}
          >
            <motion.span
              className="my-auto text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              variants={fadeInUp}
            >
              with
            </motion.span>
            <motion.p
              className="flex-1 text-base sm:text-lg md:text-xl font-normal my-auto mt-2 md:mt-0 text-gray-400"
              variants={fadeInUp}
            >
              Tempus egestas sed sed risus pretium. Commodo sed egestas egestas
              fringilla phasellus faucibus. At quis risus sed vulputate odio.
            </motion.p>
          </motion.div>
          <motion.p
            className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-4"
            variants={fadeInUp}
          >
            CPY Academy
          </motion.p>
          <motion.div className="mt-6 md:mt-10" variants={fadeInUp}>
            <SearchBar
              onSearch={handleSearch}
              placeholder="What do you want to learn?..."
            />
          </motion.div>
          <motion.div className="mt-5" variants={fadeInUp}>
            <button className="mt-5 md:mt-8 lg:mt-12 xl:mt-20">
              <Link
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex gap-2 items-center text-base sm:text-lg md:text-xl"
              >
                Connect our expert
                <ArrowRight className="bg-primary text-white rounded-full text-xl p-1" />{" "}
              </Link>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 order-2 md:order-2 flex items-center justify-center mt-6 md:mt-0"
          variants={slideRight}
        >
          <Image
            src={banner1}
            alt="Banner"
            className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg shadow-lg"
            style={{
              width: "100%",
              height: "auto",
            }}
            priority
          />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Banner;
