import React from 'react'
import PostPage from '@/components/PostPage'

const SinglePostPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/posts/${id}`, {
    cache: 'no-store'
  });
  const post = await res.json();

  return <PostPage post={post} />;
};

export default SinglePostPage;
