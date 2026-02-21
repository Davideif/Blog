import React from "react";
import { fetchPosts } from "@/lib/requests";
import PostTable from "@/components/PostTable";
import DeletePostButton from "@/components/DeletePostButton";

const Posts = async () => {

  const posts = await fetchPosts();

    return (
  <PostTable
    posts={posts}
    linkBasePath="/dashboard/posts"
    renderActions={(post) => (
      <DeletePostButton postId={post._id} />
    )}
  />
);
};

export default Posts;
  