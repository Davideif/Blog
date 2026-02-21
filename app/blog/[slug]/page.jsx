import React from 'react';
import connectDB from '@/lib/mongodb';
import PostModel from '@/models/Post';
import Post from '@/components/Post';

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  await connectDB();
  const doc = await PostModel.findOne({ slug: resolvedParams.slug });
  if (!doc) return <p>Not found</p>;

  const post = {
    _id: doc._id.toString(),
    title: doc.title,
    content: doc.content,
    author: doc.author || null,
    createdAt: doc.createdAt?.toISOString?.(),
  };

  return <Post post={post} />;
}




