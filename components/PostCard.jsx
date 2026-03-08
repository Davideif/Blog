import React from "react";
import Link from "next/link";
import { RichText } from "@/components/rich-text-editor";

const PostCard = ({ post }) => {
  if (!post) return null;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {post.title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {post.author} • {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <RichText content={post.content} preview />
      <Link
  href={`/blog/${post.slug}`}
  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
>
  Read more →
</Link>

    </div>
  );
};

export default PostCard;