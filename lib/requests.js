// Fetch all posts
async function fetchPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/posts`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    // Ensure each post has a slug property
    const posts = await res.json();
    return posts.map(post => ({
      ...post,
      slug: post.slug || undefined,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

