import React from 'react'
import PostTable from '@/components/PostTable'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'

const  Blog = async () => {

    await connectDB();
    
      
      const postsData = await Post.find().sort({ createdAt: -1 });
      
      
      const posts = JSON.parse(JSON.stringify(postsData));

  return (
    <PostTable posts={posts} linkBasePath="/blog" linkField="slug" />
  )
}

export default Blog