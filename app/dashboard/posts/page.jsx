import React from "react";
import DeletePostButton from "@/components/DeletePostButton";

const Posts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();

    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Content</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {post.title}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {post.content}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <DeletePostButton postId={post._id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div>
        <p style={{ color: "red" }}>
          Sorry, we couldn’t load posts right now.
        </p>
      </div>
    );
  }
};

export default Posts;
  