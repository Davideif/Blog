import React from "react";
import Link from "next/link";
import { RichText } from "@/components/rich-text-editor";
import { IPostPopulated } from "@/models/Post";

const PostCard = ({ post }: { post?: IPostPopulated }) => {
  if (!post) return null;

  return (
    <div className="bg-surface border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      
      <h3 className="text-xl font-bold text-text-primary mb-2">
        {post.title}
      </h3>

      <p className="text-sm text-text-muted mb-3">
        {post.author?.email} • {new Date(post.createdAt!).toLocaleDateString()}
      </p>

      <div className="mb-4 text-text-muted text-sm line-clamp-3">
        <RichText content={post.content} preview />
      </div>

      <Link href={`/blog/${post.slug}`} className="text-brand-500 font-medium hover:text-brand-600 hover:underline transition-colors">
        Read more →
      </Link>

    </div>
  );
};

export default PostCard;