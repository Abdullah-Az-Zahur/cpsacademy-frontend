"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import EventCard from "./Card/EventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { events } from "@/data/events";
import Marquee from "../Marquee/Marquee";
import { eventMarquee } from "@/data/eventMarquee";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

const Events = () => {
  return (
    <div className="my-5 md:my-10 lg:my-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-1/2 my-auto">
          <p className="text-primary text-sm sm:text-base font-medium">
            NEXT COMING EVENTS
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold py-4 md:py-6 lg:py-8">
            Cultivate your most empowered{" "}
            <span className="text-primary">mindset</span>
          </p>
          <button className="mt-4">
            <button className="flex gap-2 items-center text-sm sm:text-base hover:gap-3 transition-all duration-300">
              View all events{" "}
              <ArrowRight className="bg-primary text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 p-1" />{" "}
            </button>
          </button>
        </div>

        <div className="lg:w-1/2 w-full max-w-4xl mx-auto">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass: "swiper-pagination-bullet !bg-gray-300 !opacity-100",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
            }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              // When window width is >= 768px (medium devices)
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            loop={true}
            speed={700}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="rounded-2xl"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <motion.div
                  className="p-1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <EventCard
                    date={event.date}
                    location={event.location}
                    description={event.description}
                    image={event.image}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination flex justify-center mt-4 sm:mt-6 gap-2"></div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row my-6 md:my-8 lg:my-10 gap-3 sm:gap-5">
        <span className="font-bold whitespace-nowrap text-sm sm:text-base my-auto text-center sm:text-left">
          Trusted by
        </span>
        <div className="flex-1 mx-auto container">
          <Marquee data={eventMarquee} displayMode="logoAndText" />
        </div>
      </div>
    </div>
  );
};

export default Events;
