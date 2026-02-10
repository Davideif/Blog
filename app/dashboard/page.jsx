import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import DeletePostButton from "@/components/DeletePostButton";

// Server Component — can fetch data directly
export default async function DashboardPage() {
  await connectDB();

  // Fetch all posts, newest first
  const posts = await Post.find().sort({ createdAt: -1 });

  // Handle deletion (simple example)
 

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Posts Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Author</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2 text-gray-400 italic">
                  Not set
                </td>

                {/* Actions column */}
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    {/* Edit button */}
                    <Link
                      href={`/dashboard/posts/${post._id}/edit`}
                      className="px-2 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                    >
                      Edit
                    </Link>

                    {/* Delete button */}
                    <DeletePostButton postId={post._id.toString()}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {posts.length === 0 && (
          <p className="text-gray-500 mt-4">
            No posts yet. Create your first one.
          </p>
        )}
      </div>

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
