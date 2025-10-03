"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Define the interface for marquee items
export interface MarqueeItem {
  id: string | number;
  logo?: string;
  title: string;
}

// Define the component props interface
interface MarqueeProps {
  data: MarqueeItem[];
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  logoSize?: number;
  displayMode?: "logoAndText" | "textOnly" | "textWithAsterisks";
  gradient?: boolean;
  gradientColor?: string;
  gradientWidth?: string | number;
  textStyle?: string;
  asteriskStyle?: string;
}

const Marquee = ({
  data,
  direction = "left",
  speed = 50,
  pauseOnHover = false,
  className = "",
  itemClassName = "",
  logoSize = 40,
  displayMode = "logoAndText",
  gradient = true,
  gradientColor = "",
  gradientWidth = "5rem",
  textStyle = "font-semibold text-lg",
  asteriskStyle = "text-yellow-500 mx-1",
}: MarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (marqueeRef.current) {
      setWidth(marqueeRef.current.scrollWidth / 2);
    }
  }, [data, displayMode]);

  // Function to render content based on display mode
  const renderItemContent = (item: MarqueeItem) => {
    switch (displayMode) {
      case "logoAndText":
        return (
          <>
            {item.logo && (
              <Image
                src={item.logo}
                alt={item.title}
                width={logoSize}
                height={logoSize}
                className="object-contain"
              />
            )}
            <span className={`ml-2 ${textStyle}`}>{item.title}</span>
          </>
        );

      case "textOnly":
        return <span className={textStyle}>{item.title}</span>;

      case "textWithAsterisks":
        return (
          <>
            <span className={asteriskStyle}>*</span>
            <span className={textStyle}>{item.title}</span>
            <span className={asteriskStyle}>*</span>
          </>
        );

      default:
        return <span className={textStyle}>{item.title}</span>;
    }
  };

  // Duplicate items for seamless looping
  const repeatedItems = [...data, ...data];

  return (
    <div className={`relative flex items-center overflow-hidden ${className}`}>
      {/* Left gradient */}
      {gradient && (
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: gradientWidth,
            background: `linear-gradient(to right, ${gradientColor}, transparent)`,
          }}
        />
      )}

      {/* Right gradient */}
      {gradient && (
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: gradientWidth,
            background: `linear-gradient(to left, ${gradientColor}, transparent)`,
          }}
        />
      )}

      <motion.div
        ref={marqueeRef}
        className="inline-flex items-center"
        animate={{ x: direction === "left" ? [0, -width] : [-width, 0] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`inline-flex items-center mx-4 flex-shrink-0 ${itemClassName}`}
          >
            {renderItemContent(item)}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
