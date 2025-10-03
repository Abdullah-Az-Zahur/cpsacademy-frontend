"use client";

import React, { useEffect, useState } from "react";
import { CourseItem } from "@/types/course";
import CourseCard from "./CourseCard/CourseCard";

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/courses?populate=*`
        );
        const data = await res.json();
        // Sort latest courses first
        const sortedCourses = data.data.sort(
          (a: CourseItem, b: CourseItem) =>
            new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
        );
        setCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading)
    return <div className="text-center py-12 text-gray-500">Loading courses...</div>;

  return (
    <div className="px-4 py-12 container mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Latest Courses</h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;

