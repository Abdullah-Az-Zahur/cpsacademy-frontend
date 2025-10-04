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
        const sortedCourses = (data.data || []).sort(
          (a: CourseItem, b: CourseItem) =>
            new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
        );
        setCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
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
        <div className="text-center py-20">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-muted-foreground/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-3">Coming Soon!</h3>
          <p className="text-muted-foreground text-lg mb-2">
            We&apos;re building comprehensive courses for you.
          </p>
          <p className="text-muted-foreground">
            Check back soon to start your learning journey!
          </p>
        </div>
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