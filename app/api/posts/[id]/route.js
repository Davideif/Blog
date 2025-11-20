    import connectDB from "@/lib/mongodb";
    import Post from "@/models/Post";

    // DELETE api/posts/:id
    export async function DELETE(req, { params }) {
         const { id: postId } = await params;
        await connectDB(); 

        try {
            const deletedPost = await Post.findByIdAndDelete(postId);

            if (!deletedPost) {
                return new Response(JSON.stringify({ message: "Post not found" }), {
                    status: 404,
                });
            }

            return new Response(JSON.stringify({ message: "Post deleted successfully" }), {
                status: 200,
            });

        } catch (error) {
            return new Response(JSON.stringify({ message: "Error deleting post", error }), {
                status: 500,
            });
        }
    }

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
    return new Response(JSON.stringify({ message: "Error fetching post", error }), {
      status: 500,
    });
  }
}


// PUT api/posts/:id

import connectDB from "@/utils/connectDB";
import Post from "@/models/Post";

export async function PUT(req, { params }) {
  const { id } = params;

  await connectDB();

  try {
    const body = await req.json(); // parse request body

    const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });

    if (!updatedPost) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error("Failed to update the post", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

}