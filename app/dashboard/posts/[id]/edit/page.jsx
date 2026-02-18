import React from 'react'
import PostForm from '@/components/PostForm'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'

export default async function EditPostPage({ params }) {
  const { id } = await params;

  await connectDB();

  const postDoc = await Post.findById(id).lean();

  if (!postDoc) {
    return <div>Post not found</div>
  }

  const post = JSON.parse(JSON.stringify(postDoc));

  return <PostForm post={post} postId={id} />
}