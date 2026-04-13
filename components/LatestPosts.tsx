import React from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { IPostPopulated } from "@/models/Post";

const LatestPosts = ({ posts }: { posts?: IPostPopulated[]; }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">

      <h2 className="text-3xl font-bold text-text-primary text-center mb-10">
        Latest Posts
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id.toString()} post={post} />
        ))}
      </div>

      <Link
        href="/blog"
        className="block text-center mt-10 text-brand-500 font-medium hover:text-brand-600 hover:underline transition-colors"
      >
        View All Posts →
      </Link>

    </section>
  );
};

export default LatestPosts;