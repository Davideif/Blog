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
