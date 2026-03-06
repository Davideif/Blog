import React from "react";
import PostCard from "@/components/PostCard";

const LatestPosts = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Latest Posts
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;