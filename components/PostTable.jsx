import Link from "next/link";
import React from "react";

const PostTable = ({ posts, renderActions, linkBasePath = "/dashboard/posts", linkField = "_id" }) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-border shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">

          <thead className="bg-surface-muted border-b border-border sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-text-primary tracking-wide">Title</th>
              <th className="px-6 py-4 text-left font-semibold text-text-primary tracking-wide">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-text-primary tracking-wide">Author</th>
              {renderActions && (
                <th className="px-6 py-4 text-right font-semibold text-text-primary tracking-wide">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {sortedPosts.map((post) => (
              <tr key={post._id} className="group hover:bg-surface-muted transition-colors">

                <td className="px-6 py-4 font-medium text-text-primary">
                  <Link href={`${linkBasePath}/${post[linkField]}`} className="hover:text-brand-500 transition-colors">
                    {post.title}
                  </Link>
                </td>

                <td className="px-6 py-4 text-text-muted">
                  {new Date(post.createdAt).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-text-muted">
                  {post.author?.email || "Unknown"}
                </td>

                {renderActions && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      {renderActions(post)}
                    </div>
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default PostTable;