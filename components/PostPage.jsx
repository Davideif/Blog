import React from 'react'

export default function PostPage({ post }) {

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-1">By {post.author}</p>
      <p className="text-gray-500 mb-6">{post.date}</p>
      <p className="text-lg text-gray-800">{post.content}</p>
    </div>
  );
}
