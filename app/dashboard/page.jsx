import Link from "next/link";
import PostTable from "@/components/PostTable";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import DeletePostButton from "@/components/DeletePostButton";


export default async function DashboardPage() {
  await connectDB();

  
  const postsData = await Post.find().sort({ createdAt: -1 });
  
  
  const posts = JSON.parse(JSON.stringify(postsData));

  return (
    <div className="p-6">
     
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Pass the posts and a function to render action buttons */}
      <PostTable 
        posts={posts}
        renderActions={(post) => (
          <div className="flex gap-2">
            <Link href={`/dashboard/posts/${post._id}/edit`}>Edit</Link>
            <DeletePostButton postId={post._id} />
    </div>
  )}
/>



      {/* New Post Button */}
      <Link
        href="/dashboard/posts/new"
        className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        New Post
      </Link>
    </div>
  );
}
