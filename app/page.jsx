import React from 'react'
import HeroSection from '@/components/HeroSectiom';
import LatestPosts from '@/components/LatestPosts';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

const HomePage = async () => { 
  await connectDB();
  const posts = await Post.find().populate('author', 'email').sort({ createdAt: -1 }).limit(3).lean();

  return (
    <>
       <HeroSection />
       <LatestPosts posts={posts} />
    
    </>
 
  )
}

export default HomePage
