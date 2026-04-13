import React from 'react'
import { RichText } from "@/components/rich-text-editor";
import { IPostPopulated } from '@/models/Post';

const Post = ({ post }: { post?: IPostPopulated }) => {
  if (!post) return null;

  return (
    <article className="bg-surface border border-border rounded-lg shadow-sm p-8 max-w-2xl mx-auto my-10">
      
      <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-3">
        {post.title}
      </h1>

      <p className="text-sm text-text-muted mb-6 pb-6 border-b border-border">
        {post.author?.email} • {new Date(post.createdAt!).toLocaleString()}
      </p>

      <div className="text-text-primary leading-relaxed prose">
        <RichText content={post.content} />
      </div>

    </article>
  );
};

export default Post 