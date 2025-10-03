"use client";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

const EmailSubscribe = () => {
  return (
    <div className="bg-white rounded-3xl md:rounded-4xl p-4 md:p-5 lg:p-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl w-full"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full"
        >
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full p-4 md:p-5 lg:p-6 text-sm md:text-base rounded-xl md:rounded-2xl"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-primary flex items-center justify-between sm:justify-center rounded-full py-3 px-4 sm:px-2 md:px-4 gap-2 text-white font-medium text-sm md:text-base whitespace-nowrap min-w-[140px]"
          >
            <span className="ml-2">Subscribe</span>
            <div className="bg-white text-primary rounded-full p-1 flex-shrink-0">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailSubscribe;
