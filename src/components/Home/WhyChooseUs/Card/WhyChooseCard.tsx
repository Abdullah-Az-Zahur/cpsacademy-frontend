"use client";


import { fadeInUp } from "@/components/animations/variants";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Rocket, BookOpen, Award, LucideIcon } from "lucide-react";

interface WhyChooseCardProps {
  bgColor: string;
  title: string;
  description: string;
  icon: "rocket" | "book" | "award";
  delay?: number;
}

const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  book: BookOpen,
  award: Award,
};

const WhyChooseCard: React.FC<WhyChooseCardProps> = ({
  bgColor,
  title,
  description,
  icon,
  delay = 0,
}) => {
  const Icon = iconMap[icon];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className="w-full px-2 sm:px-4 mb-6 md:mb-0" // Responsive spacing
    >
      <Card
        className={`relative overflow-hidden rounded-2xl shadow-xl ${bgColor} text-white p-6 sm:p-8 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col`}
      >
        <CardContent className="p-0 flex flex-col h-full">
          {/* Icon Container */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-white/20 mb-4 sm:mb-6">
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base opacity-90 mb-0 mt-auto leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WhyChooseCard;
