import Link from 'next/link';
import React from 'react'


const PostTable = ({ posts, renderActions, linkBasePath = "/dashboard/posts" }) => {

    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));   

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Title</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Date</th>
            {renderActions && <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedPosts.map((post, idx) => (
            <tr key={post._id} className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 transition"}>
              <td className="px-4 py-3 border-b text-gray-900 dark:text-white">
                <Link href={`${linkBasePath}/${post.slug || post._id}`} className="hover:underline font-medium">
                  {post.title}
                </Link>
              </td>
              <td className="px-4 py-3 border-b text-gray-600 dark:text-gray-300">
                {new Date(post.createdAt).toLocaleString()}
              </td>
              {renderActions && (
                <td className="px-4 py-3 border-b">
                  {renderActions(post)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostTable