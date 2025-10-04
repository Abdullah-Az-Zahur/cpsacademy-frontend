"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ModuleItem } from "@/types/module";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import ModuleCard from "./ModuleCard/ModuleCard";
import CategoryFilter from "@/components/common/CategoryFilter/CategoryFilter";

/**
 * ModuleList - main page section
 */
const ModuleList: React.FC = () => {
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const { user, loading, setLoading } = useAuth();

  type StrapiCollection<T> = {
    data: T[];
    meta?: unknown;
  };

  useEffect(() => {
    const ac = new AbortController();
    async function fetchModules() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/modules?populate=classes`,
          { signal: ac.signal }
        );

        const json = (await res.json()) as StrapiCollection<ModuleItem>;
        const items: ModuleItem[] = Array.isArray(json.data) ? json.data : [];

        items.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
        setModules(items);
      } catch (err: unknown) {
        // narrow the unknown — DOMException is thrown by AbortController in the browser
        if (err instanceof DOMException && err.name === "AbortError") return;

        // If you want safe access to Error properties, check `err instanceof Error`
        if (err instanceof Error) {
          console.error("Failed to fetch modules:", err.message);
        } else {
          // fallback for anything else
          console.error("Failed to fetch modules:", err);
        }
        // Set empty array on error
        setModules([]);
      } finally {
        if (typeof setLoading === "function") setLoading(false);
      }
    }

    fetchModules();
    return () => ac.abort();
  }, [setLoading]);

  // unique course titles -> categories
  const allCourses = useMemo(() => {
    const s = new Set<string>();
    modules.forEach((m) => {
      if (m.course?.title) s.add(m.course.title);
    });
    return Array.from(s).sort();
  }, [modules]);

  // filter modules by selected course
  const filteredModules = useMemo(() => {
    if (selectedCourse === "all") return modules;
    return modules.filter((m) => m.course?.title === selectedCourse);
  }, [modules, selectedCourse]);

  // developer-only check
  const isDeveloper = !!user && user.role === "developer";

  if (loading)
    return <div className="text-center py-12">Loading modules...</div>;

  if (!user || !isDeveloper) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium mb-4">
          Please login as a <span className="font-bold">developer</span> to view
          modules.
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

  // Show coming soon if no modules available
  if (modules.length === 0) {
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-3">Coming Soon!</h3>
          <p className="text-muted-foreground text-lg mb-2">
            We&apos;re preparing exciting modules for you.
          </p>
          <p className="text-muted-foreground">
            Check back soon to start building amazing projects!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 container mx-auto">
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-2">
        All Modules
      </h3>
      <p className="text-muted-foreground text-center mb-8">
        Manage modules and inspect classes inside each module
      </p>

      <CategoryFilter
        categories={allCourses}
        selectedCategory={selectedCourse}
        onCategoryChange={setSelectedCourse}
      />

      {filteredModules.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No modules found for this course.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredModules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ModuleList;