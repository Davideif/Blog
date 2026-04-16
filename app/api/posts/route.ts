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

  
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { message: "Request body must be a JSON object." },
      { status: 400 }
    );
  }

  const { title, content } = body as { title?: string; content?: string };

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json(
      { message: "Title and content are required." },
      { status: 400 }
    );
  }


  try {
    await connectDB();

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
   
    console.error("[POST /api/posts]", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { message: "Validation failed", error: error.message },
        { status: 400 }
      );
    }

   
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        { message: "A post with this title already exists." },
        { status: 409 } 
      );
    }

  
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}

// GET /api/posts?page=1&limit=10
export async function GET(req: NextRequest) {

  
  const { searchParams } = new URL(req.url);

  const pageParam = parseInt(searchParams.get("page") ?? "1");
  const limitParam = parseInt(searchParams.get("limit") ?? "10");

  if (Number.isNaN(pageParam) || Number.isNaN(limitParam)) {
    return NextResponse.json(
      { message: "Page and limit must be valid numbers." },
      { status: 400 } // 400 = caller's fault, bad input
    );
  }

  const page = Math.max(1, pageParam);
  const limit = Math.min(15, Math.max(1, limitParam));
  const skip = (page - 1) * limit;


 
  try {
    await connectDB();

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
    
    console.error("[GET /api/posts]", error);

    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to fetch posts", error: errorMessage },
      { status: 500 } 
    );
  }
}