import Link from 'next/link';
import React from 'react'

const PostTable = ({posts,renderActions}) => {

    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));   

  return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
          </tr>
        </thead>

        <tbody>
          {sortedPosts.map((post) => (
            <tr key={post._id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <Link href={`/dashboard/posts/${post._id}`}>{post.title}</Link>
              </td>
             <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {new Date(post.createdAt).toLocaleString()}
              </td>
               {renderActions && (
              <td>
                {renderActions(post)}
              </td>
            )}
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default PostTable