import HeroSection from '@/components/HeroSection';
import LatestPosts from '@/components/LatestPosts';
import connectDB from '@/lib/mongodb';
import Post, { IPostPopulated } from '@/models/Post';



const HomePage = async () => { 
  await connectDB();
  const posts = await Post.find().populate('author', 'email').sort({ createdAt: -1 }).limit(3).lean() as unknown as IPostPopulated[];

  return (
    <>
       <HeroSection />
       <LatestPosts posts={posts} />
    
    </>
 
  )
}

export default HomePage
