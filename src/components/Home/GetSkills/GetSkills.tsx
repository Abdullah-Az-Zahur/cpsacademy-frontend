"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Define the tab keys as a type
type TabKey = "transparency" | "creative" | "worldRecord";

const GetSkills = () => {
  // Initialize with a valid tab key
  const [activeTab, setActiveTab] = useState<TabKey>("transparency");

  // Sample data for each category
  const tabData = {
    transparency: {
      title: "Transparency Metrics",
      description: "Our commitment to open and honest processes",
      data: [
        { label: "Communication", value: 92 },
        { label: "Documentation", value: 85 },
        { label: "Process Openness", value: 96 },
        { label: "Feedback Acceptance", value: 88 },
      ],
    },
    creative: {
      title: "Creative Skills",
      description: "Our innovative and design thinking capabilities",
      data: [
        { label: "Design Thinking", value: 95 },
        { label: "Problem Solving", value: 91 },
        { label: "Innovation", value: 89 },
        { label: "Visual Design", value: 93 },
      ],
    },
    worldRecord: {
      title: "World Record Achievements",
      description: "Areas where we've set industry benchmarks",
      data: [
        { label: "Fastest Delivery", value: 100 },
        { label: "Client Satisfaction", value: 98 },
        { label: "Project Scale", value: 96 },
        { label: "Technical Complexity", value: 97 },
      ],
    },
  };

  // Get the tab keys in a type-safe way
  const tabKeys = Object.keys(tabData) as TabKey[];

  return (
    <div className="container mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-20">
      {/* Left Section - Tabs and Content */}
      <div className="w-full lg:w-1/2">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {tabKeys.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab === "worldRecord"
                ? "World Record"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {tabData[activeTab].title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {tabData[activeTab].description}
              </p>
            </div>

            {/* Visualization based on active tab */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {tabData[activeTab].data.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-blue-600">
                      {item.value}%
                    </span>
                  </div>

                  {/* Different visualization for each tab */}
                  {activeTab === "transparency" && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className="bg-blue-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  )}

                  {activeTab === "creative" && (
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <motion.div
                            className="bg-purple-600 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{
                              delay: 0.5 + index * 0.1,
                              duration: 1,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                    </div>
                  )}

                  {activeTab === "worldRecord" && (
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 sm:mr-3">
                        <motion.div
                          className="bg-green-600 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        />
                      </div>
                      <motion.div
                        className="text-xs font-bold text-green-600 whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        {item.value >= 95 ? "Record Setter" : "High Achiever"}
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Additional visualizations based on active tab */}
            {activeTab === "transparency" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">
                  Transparency Score Over Time
                </h4>
                <div className="h-32 sm:h-40 flex items-end space-x-1 sm:space-x-2 justify-center">
                  {[65, 75, 80, 85, 90, 92].map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                      className="w-6 sm:w-8 bg-blue-500 rounded-t-lg flex items-end justify-center"
                    >
                      <span className="text-xs text-white -mt-5 sm:-mt-6">
                        {value}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "creative" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100"
              >
                <h4 className="font-semibold text-purple-800 mb-4 text-sm sm:text-base">
                  Creative Skills Distribution
                </h4>
                <div className="flex justify-center">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {[30, 25, 20, 25].map((percentage, i) => {
                        const offset = [0, 30, 55, 75][i];
                        const color = [
                          "#8B5CF6",
                          "#A78BFA",
                          "#C4B5FD",
                          "#DDD6FE",
                        ][i];
                        return (
                          <motion.circle
                            key={i}
                            cx="50"
                            cy="50"
                            r="45"
                            fill="transparent"
                            stroke={color}
                            strokeWidth="10"
                            strokeDasharray={`${percentage} 100`}
                            strokeDashoffset={offset}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 1 + i * 0.2, duration: 1 }}
                            transform="rotate(-90 50 50)"
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base sm:text-lg font-bold text-purple-800">
                        94%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "worldRecord" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100"
              >
                <h4 className="font-semibold text-green-800 mb-4 text-sm sm:text-base">
                  Record Achievement Timeline
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      year: "2020",
                      event: "Fastest Project Delivery",
                      score: "98%",
                    },
                    {
                      year: "2021",
                      event: "Largest Project Scale",
                      score: "99%",
                    },
                    {
                      year: "2022",
                      event: "Highest Client Satisfaction",
                      score: "100%",
                    },
                    {
                      year: "2023",
                      event: "Most Complex Implementation",
                      score: "97%",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.2 }}
                      className="flex items-center"
                    >
                      <div className="w-12 sm:w-16 h-6 sm:h-8 bg-green-600 text-white flex items-center justify-center rounded-lg font-bold text-xs sm:text-sm">
                        {item.year}
                      </div>
                      <div className="ml-2 sm:ml-4 flex-1">
                        <div className="font-medium text-xs sm:text-sm">
                          {item.event}
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap">
                        {item.score}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Section - Content and Buttons */}
      <div className="w-full lg:w-1/2 my-auto">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, nisi.
        </p>
        <p className="text-gray-500 my-5 md:my-8 text-sm sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
          reprehenderit dolorem culpa perspiciatis, doloribus rem ipsum
          molestiae sed repudiandae officia!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10">
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-1"
          >
            <Link
              href="#"
              className="bg-black text-white px-4 py-3 sm:px-5 sm:py-3 rounded-full inline-block w-full text-center text-sm sm:text-base"
            >
              Get started today
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-1"
          >
            <Link
              href="/signup"
              className="bg-white hover:bg-black text-black hover:text-white border px-4 py-3 sm:px-5 sm:py-3 rounded-full inline-block w-full text-center text-sm sm:text-base transition-colors duration-300"
            >
              Create an account
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GetSkills;
