import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

// GET api/posts/:id
export async function GET(req, { params }) {
  const { id } = await params;

  await connectDB();

  try {
    const post = await Post.findById(id);

    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(post), { status: 200 });

  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching post", error: error.message }),
      { status: 500 }
    );
  }
}


// PUT api/posts/:id
export async function PUT(req, { params }) {
  const { id } = await params;

  await connectDB();

  try {
    const body = await req.json();

    const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });

    if (!updatedPost) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedPost), { status: 200 });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error updating post", details: error.message }),
      { status: 500 }
    );
  }
}


// DELETE api/posts/:id
export async function DELETE(req, { params }) {
  const { id } = await params;

  await connectDB(); 

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return new Response(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting post", error: error.message }),
      { status: 500 }
    );
  }
}
