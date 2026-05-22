import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import PostComponent from "@/components/Post";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const post = await Post.findById(id).lean();

  if (!post) return <p>Not found</p>;

  return <PostComponent post={JSON.parse(JSON.stringify(post))} />;
}