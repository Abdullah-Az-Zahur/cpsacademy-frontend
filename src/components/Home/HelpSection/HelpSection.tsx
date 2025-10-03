import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HelpSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 xl:gap-24 px-4 sm:px-6 lg:px-8">
      {/* Heading Section */}
      <div className="md:flex-1">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          We&apos;re here to help you cultivate your most empowered{" "}
          <span className="text-primary">mindset</span>
        </h3>
      </div>

      {/* Content Section */}
      <div className="md:flex-1 flex flex-col justify-between">
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 md:mb-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ab
          assumenda esse debitis quas unde nihil quod exercitationem dolorum
          veritatis.
        </p>

        <button className="mt-4 md:mt-8 lg:mt-12 self-start md:self-auto">
          <Link
            href="#"
            className="flex gap-2 items-center group text-sm sm:text-base md:text-lg font-medium hover:gap-3 transition-all duration-300"
          >
            View all events
            <ArrowRight className="bg-primary text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 p-1 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HelpSection;
