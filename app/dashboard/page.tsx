import Link from "next/link";
import PostTable from "@/components/PostTable";
import DeletePostButton from "@/components/DeletePostButton";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import type { IPostPopulated } from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Pagination from "@/components/Pagination";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  await connectDB();

  const [posts, total] = await Promise.all([
    Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "email")
      .limit(10)
      .lean() as unknown as IPostPopulated[],
    Post.countDocuments(),
  ]);

  const data = {
    posts,
    page: 1,
    totalPages: Math.ceil(total / 10),
    totalPosts: total,
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-heading mb-6">Dashboard</h1>
      <PostTable
        posts={data.posts}
        renderActions={(post) => {
          const isOwner = session?.user?.id === post.author?._id?.toString();
          const isAdmin = session?.user?.role === "admin";
          const canEdit = isOwner || isAdmin;

          if (!canEdit) return null;

          return (
            <div className="flex gap-2">
              <Link href={`/dashboard/posts/${post._id}/edit`}>Edit</Link>
              <DeletePostButton postId={post._id.toString()} />
            </div>
          );
        }}
      />
      <Link
        href="/dashboard/posts/new"
        className="inline-block px-4 py-2 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
      >
        New Post
      </Link>
      <Pagination currentPage={data.page} totalPages={data.totalPages} />
    </div>
  );
}