"use client";

import React from "react";
import Image from "next/image";
import { CourseItem } from "@/types/course";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: CourseItem;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const imageUrl =
    course.coverImage?.formats?.medium?.url ||
    course.coverImage?.formats?.large?.url ||
    course.coverImage?.url ||
    "";

  const shortDesc =
    course.shortDescription
      ?.map((block) => block.children?.map((child) => child.text).join(" "))
      .join(" ") || "";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow cursor-pointer"
    >
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
            alt={course.title || "Course Cover"}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {course.title || "Untitled Course"}
        </h3>

        <p className="text-sm text-gray-700 mb-2 line-clamp-3">{shortDesc}</p>

        <div className="flex justify-between items-center mt-2">
          {course.level && <Badge>{course.level}</Badge>}
          <span className="text-xs text-gray-400">
            {course.modules ? course.modules.length : 0} modules
          </span>
        </div>

        {course.createdAt && (
          <div className="text-xs text-gray-400 mt-1">
            Created: {new Date(course.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;
