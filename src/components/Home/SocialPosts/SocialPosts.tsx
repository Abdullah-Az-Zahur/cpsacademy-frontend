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
        const sortedPosts = (data.data || []).sort(
          (a: PostItem, b: PostItem) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
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
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-3">Coming Soon!</h3>
          <p className="text-muted-foreground text-lg mb-2">
            We&apos;re crafting exciting content for you.
          </p>
          <p className="text-muted-foreground">
            Check back soon for the latest updates and posts!
          </p>
        </div>
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