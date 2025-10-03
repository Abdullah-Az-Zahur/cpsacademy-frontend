"use client";

import React from "react";
import { PostItem } from "@/types/post";
import Image from "next/image";
import { motion } from "framer-motion";

interface SocialPostCardProps {
  post: PostItem;
}

const SocialPostCard: React.FC<SocialPostCardProps> = ({ post }) => {
  // Prefer medium, then large, then original URL
  const imageUrl =
    post.media?.formats?.medium?.url ||
    post.media?.formats?.large?.url ||
    post.media?.url ||
    "";

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow"
    >
      {/* Post Image */}
      {imageUrl && (
        <div className="relative h-56 w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
            alt={post.title || "Post image"}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Post Body */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{post.title || "Untitled Post"}</h3>

        {post.content?.map((block, idx) =>
          block.children?.map((child, cidx) => (
            <p
              key={`${idx}-${cidx}`}
              className="text-sm text-gray-700 mb-2 line-clamp-3"
            >
              {child.text || ""}
            </p>
          ))
        )}

        <div className="text-xs text-gray-400 mt-2">
          Posted on: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Unknown"}
        </div>
      </div>
    </motion.div>
  );
};

export default SocialPostCard;
