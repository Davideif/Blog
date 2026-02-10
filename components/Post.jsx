import React from 'react'

const Post = ({post}) => {
  if (!post) return null;
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.author} • {new Date(post.createdAt).toLocaleString()}</p>
      <div>{post.content}</div>
    </article>
  );
}

export default Post 