import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

// POST /api/posts
export async function POST(req) {
    try {
        await connectDB();

        const { title, content } = await req.json();

        // ---- Validation ----
        if (!title || !content) {
            return new Response(
                JSON.stringify({
                    message: "Title and content are required."
                }),
                { status: 400 }
            );
        }

        const newPost = await Post.create({ title, content });

        return new Response(
            JSON.stringify({
                message: 'Post created successfully',
                post: newPost
            }),
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({
                message: 'Failed to create post',
                error: error.message
            }),
            { status: 500 }
        );
    }
}

// GET /api/posts
export async function GET(req) {
  try {
    await connectDB();
    const posts = await Post.find();

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Failed to fetch posts:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch posts" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
