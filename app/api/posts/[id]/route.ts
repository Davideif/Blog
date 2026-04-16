import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextRequest,NextResponse } from "next/server";


// GET /api/posts/:id
export async function GET(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid post ID" }, {  
      status: 400,
    });
  }
  
  try {
     await connectDB();
    const post = await Post.findById(id).populate("author", "email").lean();

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, {
        status: 404,
      });
    }

    return NextResponse.json(post, { status: 200 });
   

  } catch (error) {
    console.error("[GET /api/posts/:id]", error);
    return NextResponse.json({ message: "Error fetching post"}, { status: 500 });
  }
}


// PUT /api/posts/:id
export async function PUT(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid post ID" }, {
      status: 400,
    });
  }

   const session = await getServerSession(authOptions);
   if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, {
        status: 401,
      });
    }
    
  try {
    await connectDB();
    const post = await Post.findById(id);

      if (!post) {
    return NextResponse.json({ error: "Post not found" }, {
      status: 404,
    });
  }

      if (session.user.role !== "admin" && session.user.id !== post.author.toString()) {
    return NextResponse.json({ error: "Forbidden" }, {
      status: 403,
    });
  }

  } catch (error) {
    console.error("[PUT /api/posts/:id] DB error", error);
    return NextResponse.json({ error: "Error fetching post" }, {
      status: 500,
    }); 
  }
  
  let body: unknown;

  try {

    body = await req.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Request body must be a JSON object" }, {
        status: 400,
      });
    }
    
  } catch(error) {
    console.error("[PUT /api/posts/:id] Update error", error);
    return NextResponse.json(
      { message: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

    const { title, content } = body as { title?: string; content?: string };

    if (title !== undefined && !title.trim()) {
      return NextResponse.json({ error: "Title cannot be empty" }, {
        status: 400,
      });
    }

    if (content !== undefined && !content.trim()) {
      return NextResponse.json({ error: "Content cannot be empty" }, {
        status: 400,
      });
    }
    
    try {

      const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });

      return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
      console.error("[PUT /api/posts/:id] Update DB error", error);
      return NextResponse.json({ error: "Error updating post" }, {
        status: 500,
      });
    }

 }


// DELETE /api/posts/:id
export async function DELETE(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid post ID" }, {
      status: 400,
    });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, {
      status: 401,
    });
  }
  
  let post;
  try {
    await connectDB();

    post = await Post.findById(id).lean();

    if (!post) {
    return NextResponse.json({ message: "Post not found" }, {
      status: 404,
    });
  }

    if (session.user.role !== "admin" && post.author?.toString() !== session.user.id) {
  return NextResponse.json({ error: "Forbidden" }, {
    status: 403,
  });
  }
   
  } catch (error) {
    console.error("[DELETE /api/posts/:id] DB error", error);
    return NextResponse.json({ error: "Error fetching post" }, {
      status: 500,
    });
  }

  try {
    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: "Post deleted successfully" }, {
      status: 200
    }); 
  } catch (error) {


    console.error(error);


    return NextResponse.json({ message: "Error deleting post"}, {
      status: 500
    });
  }
}
