"use client";

import React, { useEffect, useState } from "react";
import { PostItem } from "@/types/post";
import SocialPostCard from "./SocialPostCard/SocialPostCard";

const SocialPosts: React.FC = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?populate=*&sort=createdAt:desc`
        );
        const data = await res.json();
        // Sort by createdAt descending (in case backend doesn't)
        const sortedPosts = data.data.sort(
          (a: PostItem, b: PostItem) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return <div className="text-center py-12 text-gray-500">Loading posts...</div>;

  return (
    <div className="px-4 py-12 container mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Latest Posts</h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialPosts;
