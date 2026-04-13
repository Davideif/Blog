import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextRequest } from "next/server";


// GET /api/posts/:id
export async function GET(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();

  try {
    const post = await Post.findById(id).populate("author", "email").lean();

    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(post), { status: 200 });
   

  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ message: "Error fetching post", error: errorMessage }),
      { status: 500 }
    );
  }
}


// PUT /api/posts/:id
export async function PUT(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  await connectDB();

  const post = await Post.findById(id);


  if (!post) {
    return new Response(JSON.stringify({ error: "Post not found" }), {
      status: 404,
    });
  }

  if (session.user.role !== "admin" && session.user.id !== post.author.toString()) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

  try {
    const body = await req.json();

    const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });

    return new Response(JSON.stringify(updatedPost), { status: 200 });

  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    console.error(errorMessage);

    return new Response(
      JSON.stringify({ error: "Error updating post", details: errorMessage }),
      { status: 500 }
    );
  }
}


// DELETE /api/posts/:id
export async function DELETE(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  

  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  await connectDB();

  const post = await Post.findById(id).lean();
  

  if (!post) {
    return new Response(JSON.stringify({ message: "Post not found" }), {
      status: 404,
    });
  }

  if (session.user.role !== "admin" && post.author?.toString() !== session.user.id) {
  return new Response(JSON.stringify({ error: "Forbidden" }), {
    status: 403,
  });
}

  try {
    await Post.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }),
      { status: 200 }
    );

  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    console.error(errorMessage);


    return new Response(
      JSON.stringify({ message: "Error deleting post", error: errorMessage }),
      { status: 500 }
    );
  }
}
