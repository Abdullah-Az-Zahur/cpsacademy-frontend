"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants, Transition } from "framer-motion";
import image1 from "../../../../public/images/home/Subtract.png";
import image2 from "../../../../public/images/home/Subtract-1.png";
import image3 from "../../../../public/images/home/Subtract-2.png";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const transition: Transition = { duration: 0.5, ease: [0.42, 0, 0.58, 1] };

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition },
};

const imageVariants: Variants = {
  hidden: { scale: 0.98, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } },
};

const VideoTutorials = () => {
  return (
    <motion.div
      className="grid md:grid-cols-3 grid-cols-1 gap-5 mx-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="flex flex-col"
        variants={cardVariants}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div variants={imageVariants} className="overflow-hidden rounded-2xl">
          <Image
            src={image1}
            alt="image 1"
            height={400}
            width={400}
            className="rounded-2xl"
          />
        </motion.div>

        <div className="mt-5 w-5/6">
          <p className="text-2xl font-bold">Effective leader</p>
          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            laudantium.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex md:flex-col flex-col-reverse"
        variants={cardVariants}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="mt-5 w-5/6">
          <p className="text-2xl font-bold">Video Tutorials</p>
          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reiciendis, laudantium.
          </p>
        </div>

        <motion.div variants={imageVariants} className="overflow-hidden rounded-2xl">
          <Image
            src={image2}
            alt="image 2"
            height={400}
            width={400}
            className="rounded-2xl"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col"
        variants={cardVariants}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div variants={imageVariants} className="overflow-hidden rounded-2xl">
          <Image
            src={image3}
            alt="image 3"
            height={400}
            width={400}
            className="rounded-2xl"
          />
        </motion.div>

        <div className="mt-5 w-5/6">
          <p className="text-2xl font-bold">Exclusive Coach</p>
          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reiciendis, laudantium.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoTutorials;
