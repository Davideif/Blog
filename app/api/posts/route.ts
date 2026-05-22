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
