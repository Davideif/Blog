import React from 'react'
import PostTable from '@/components/PostTable'
import { fetchPosts } from '@/lib/requests'

const  Blog = async () => {

    const posts = await fetchPosts();

  return (
    <PostTable posts={posts} linkBasePath="/blog"/>
  )
}

export default Blog