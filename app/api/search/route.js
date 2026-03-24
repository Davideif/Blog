import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";

// app/api/search/route.js
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim();

    if (!q || q.length < 2) {
      return new Response(JSON.stringify({ posts: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const regex = new RegExp(q, 'i'); // 'i' = case-insensitive

    const matchingAuthors = await User.find({ email: regex }).select('_id');
    const authorIds = matchingAuthors.map(a => a._id);

    const posts = await Post.find({
      $or: [
         { title:   regex },
         { content: regex }, 
           ...(authorIds.length ? [{ author: { $in: authorIds } }] : []),
      ]
    })
    .populate('author', 'email')
    .limit(20)
    .select('title author slug createdAt');

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ posts: [], error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}