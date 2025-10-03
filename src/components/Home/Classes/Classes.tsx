"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ClassItem } from "@/types/classes";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import ClassCard from "./ClassCard/ClassCard";

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState("all");

  // Fetch classes from Strapi
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/classes?populate=*`
        );
        const data = await res.json();
        setClasses(data.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

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

  if (loading) return <div className="text-center py-12">Loading classes...</div>;

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
