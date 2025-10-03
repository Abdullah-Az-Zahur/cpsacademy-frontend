"use client";
import { useMemo, useState } from "react";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import CourseCard from "./CourseCard/CourseCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TrendingCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Extract all unique categories from courses
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    courses.forEach((course) => {
      course.category.forEach((cat) => categoriesSet.add(cat));
    });
    return Array.from(categoriesSet).sort();
  }, []);

  // Filter courses based on selected category
  const filteredCourses = useMemo(() => {
    if (selectedCategory === "all") return courses;
    return courses.filter((course) =>
      course.category.includes(selectedCategory),
    );
  }, [selectedCategory]);

  return (
    <section className="px-4 py-12">
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-2">
        Trending Courses
      </h3>
      <p className="text-muted-foreground text-center mb-8">
        Discover the most popular courses loved by thousands of students
      </p>

      <CategoryFilter
        categories={allCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No courses found in this category.
          </p>
        </div>
      )}

      <button className="bg-primary px-5 py-2 rounded-4xl my-5 mx-auto  flex">
        <Link href="#" className="flex gap-2 items-center">
          Explore all courses
          <ArrowRight className="bg-primary text-white rounded-full text-xl p-1" />{" "}
        </Link>
      </button>
    </section>
  );
};

export default TrendingCourses;
