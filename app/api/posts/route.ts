import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// POST /api/posts
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const body = await req.json();
    const { title, content } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { message: "Title and content are required." },
        { status: 400 }
      );
    }

    const newPost = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: session.user.id,
    });

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[POST /api/posts]", errorMessage);

    return NextResponse.json(
      { message: "Failed to create post", error: errorMessage },
      { status: 500 }
    );
  }
}

// GET /api/posts?page=1&limit=10
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "10")));
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .populate("author", "email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments(),
    ]);

    return NextResponse.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET /api/posts]", errorMessage);

    return NextResponse.json(
      { message: "Failed to fetch posts", error: errorMessage },
      { status: 500 }
    );
  }
}