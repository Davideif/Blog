// Fetch all posts
async function fetchPosts(page = 1) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/posts?page=${page}&limit=10`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await res.json();

    return {
      posts: data.posts.map(post => ({
        ...post,
        slug: post.slug || undefined,
      })),
      page: data.page,
      totalPages: data.totalPages,
      totalPosts: data.totalPosts,
    };

  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      posts: [],
      page: 1,
      totalPages: 1,
      totalPosts: 0,
    };
  }
}

export { fetchPosts };