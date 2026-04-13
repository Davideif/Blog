import PostModel from '@/models/Post'; 
import connectDB from '@/lib/mongodb';  
import Post from '@/components/Post';

export default async function BlogPostPage({ params}: {params: Promise<{slug: string}>}) {
  const resolvedParams = await params;
  await connectDB();
  const doc = await PostModel.findOne({ slug: resolvedParams.slug }).populate('author','email').lean(); 
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