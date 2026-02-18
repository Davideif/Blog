import React from 'react'


const Post = ({ post }) => {
  if (!post) return null;
  return (
    <article className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-xl mx-auto my-6 transition hover:shadow-lg">
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {post.author} • {new Date(post.createdAt).toLocaleString()}
      </p>
      <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
        {post.content}
      </div>
    </article>
  );
}

export default Post 