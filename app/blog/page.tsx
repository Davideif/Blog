import React from "react";
import PostTable from "@/components/PostTable";
import Pagination from "@/components/Pagination";
import connectDB from "@/lib/mongodb";
import Post, { IPostPopulated } from "@/models/Post";

const Blog = async ({ searchParams  } : {searchParams: Promise<{ page?: string; limit?: string; }> }) => {

  await connectDB();

  const params = await searchParams;

  const page = parseInt(params.page || "1") || 1;
  const limit = parseInt(params.limit || "10") || 10;

  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("author", "email")
    .skip(skip)
    .limit(limit)
    .lean() as unknown as IPostPopulated[];

  const total = await Post.countDocuments();

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <PostTable posts={posts} linkBasePath="/blog" linkField="slug" />
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
};

export default Blog;