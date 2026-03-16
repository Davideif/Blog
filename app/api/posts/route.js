import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";


// POST /api/posts
export async function POST(req) {

  const session = await getServerSession(authOptions);
  
  

  if (!session) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }


  try {
    await connectDB();

    const { title, content } = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({
          message: "Title and content are required."
        }),
        { status: 400 }
      );
    }

    const newPost = await Post.create({
  title,
  content,
  author: session.user.id,
});

    return new Response(
      JSON.stringify({
        message: "Post created successfully",
        post: newPost
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        message: "Failed to create post",
        error: error.message
      }),
      { status: 500 }
    );
  }
}

// GET /api/posts?page=1&limit=10
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .populate("author", "email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();


  const total = await Post.countDocuments();
  

  return Response.json({
    posts,
    page,
    totalPages: Math.ceil(total / limit),
    totalPosts: total,
  });
}

