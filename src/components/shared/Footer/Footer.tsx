"use client";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="relative bg-gray-900 text-white mt-20">
      {/* Floating Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 -translate-x-1/2 -top-20 w-11/12 md:w-3/4 bg-primary text-white rounded-2xl shadow-lg p-6 "
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          {" "}
          Ready to work with us ?
        </h2>
        <p className="mb-4 text-sm md:text-base">
          Join our journey and let’s build something amazing together.
        </p>
        <button className="bg-white text-primary px-6 py-2 rounded-full font-semibold hover:-translate-y-1 transition">
          Get Started
        </button>
      </motion.div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 pt-32 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 - Logo */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Company</h3>
            <p className="text-sm text-gray-400">
              Your tagline or company description goes here.
            </p>
          </div>

          {/* Column 2 - Useful Links */}
          <div>
            <h4 className="font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* Column 3 - Company Pages */}
          <div>
            <h4 className="font-semibold mb-4">Pages</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Services</li>
              <li>Portfolio</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@example.com</li>
              <li>Phone: +123 456 789</li>
              <li>Location: New York, USA</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
