"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ClassItem } from "@/types/classes";
import CategoryFilter from "../../common/CategoryFilter/CategoryFilter";
import ClassCard from "./ClassCard/ClassCard";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedModule, setSelectedModule] = useState("all");

  const { user, loading, setLoading } = useAuth();

  // Fetch classes from Strapi
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=*`
        );
        const data = await res.json();
        setClasses(data.data || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [setLoading]);

  // Extract unique modules for filter
  const allModules = useMemo(() => {
    const modulesSet = new Set<string>();
    classes.forEach((cls) => modulesSet.add(cls.module.title));
    return Array.from(modulesSet).sort();
  }, [classes]);

  // Filter classes by selected module
  const filteredClasses = useMemo(() => {
    if (selectedModule === "all") return classes;
    return classes.filter((cls) => cls.module.title === selectedModule);
  }, [classes, selectedModule]);

  if (loading) {
    return <div className="text-center py-12">Loading classes...</div>;
  }

  if (!user || user.role !== "student") {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium mb-4">
          Please login as a <span className="font-bold">student</span> to view
          classes.
        </p>
        <Link
          href="/login"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Login
        </Link>
      </div>
    );
  }

  // Show coming soon if no classes available
  if (classes.length === 0) {
    return (
      <section className="px-4 py-12 container mx-auto">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-3">Coming Soon!</h3>
          <p className="text-muted-foreground text-lg mb-2">
            We&apos;re working hard to bring you amazing classes.
          </p>
          <p className="text-muted-foreground">
            Check back soon for exciting learning opportunities!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 container mx-auto">
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-2">
        All Classes
      </h3>
      <p className="text-muted-foreground text-center mb-8">
        Learn from our curated classes and grow your skills
      </p>

      <CategoryFilter
        categories={allModules}
        selectedCategory={selectedModule}
        onCategoryChange={setSelectedModule}
      />

      {filteredClasses.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No classes found in this module.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredClasses.map((cls) => (
            <ClassCard key={cls.id} cls={cls} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Classes;