"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ModuleItem, ClassItem } from "@/types/module";
import { getYoutubeThumbnail } from "@/utils/getYoutubeThumbnail";

interface Props {
  module: ModuleItem;
}

const ClassCard: React.FC<{ cls: ClassItem }> = ({ cls }) => {
  const thumb = cls.videoUrl ? getYoutubeThumbnail(cls.videoUrl) : "";

  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition">
      <div className="relative w-28 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        {thumb ? (
          <Image
            src={thumb}
            alt={cls.title || "class thumbnail"}
            fill
            className="object-cover"
            
          />
        ) : (
          <div className="flex items-center justify-center text-xs text-gray-500">No thumbnail</div>
        )}

        {cls.recordAvailable && (
          <span className="absolute top-1 right-1 bg-primary text-white text-[10px] px-2 py-0.5 rounded">
            Recorded
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium line-clamp-1">{cls.title || "Untitled class"}</h4>
          {typeof cls.duration === "number" && <span className="text-xs text-gray-500">{cls.duration}m</span>}
        </div>

        <div className="mt-1 flex items-center gap-3 text-xs">
          {cls.videoUrl ? (
            <Link href={cls.videoUrl} target="_blank" className="text-blue-600 underline">Watch</Link>
          ) : (
            <span className="text-gray-400">No video</span>
          )}
          <span className="text-gray-400">{cls.createdAt ? new Date(cls.createdAt).toLocaleDateString() : ""}</span>
        </div>
      </div>
    </div>
  );
};

const ModuleCard: React.FC<Props> = ({ module }) => {
  return (
    <motion.article whileHover={{ y: -4 }} className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{module.title || "Untitled Module"}</h3>
            {module.course?.title && <p className="text-sm text-muted-foreground">{module.course.title}</p>}
            {module.description && <p className="mt-2 text-sm text-gray-700 line-clamp-3">{module.description}</p>}
          </div>

          <div className="text-right text-xs text-gray-400">
            {module.createdAt && <div>{new Date(module.createdAt).toLocaleDateString()}</div>}
            <div className="mt-1">{module.classes?.length ?? 0} classes</div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {module.classes && module.classes.length > 0 ? (
            module.classes.map((cls) => <ClassCard key={cls.id} cls={cls} />)
          ) : (
            <div className="text-sm text-gray-500">No classes for this module.</div>
          )}
        </div>
      </div>

      <div className="p-3 border-t border-gray-100 flex items-center justify-between">
        <Link href={module.course?.slug ? `/courses/${module.course.slug}` : "#"} className="text-sm text-primary hover:underline">
          View course
        </Link>

        <div className="text-xs text-gray-400">{module.publishedAt ? "Published" : "Unpublished"}</div>
      </div>
    </motion.article>
  );
};

export default ModuleCard;
