import Link from "next/link";
import React from "react";

const PostTable = ({
  posts,
  renderActions,
  linkBasePath = "/dashboard/posts",
  linkField = "_id",
}) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          
          {/* Header */}
          <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                Title
              </th>

              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                Date
              </th>

               <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                Author
              </th>


              {renderActions && (
                <th className="px-6 py-4 text-right font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedPosts.map((post) => (
              <tr
                key={post._id}
                className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {/* Title */}
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  <Link
                    href={`${linkBasePath}/${post[linkField]}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </td>

                 {/* Author */}
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  {post.author?.email || "Unknown"}
                </td>

                {/* Actions */}
                {renderActions && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition">
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