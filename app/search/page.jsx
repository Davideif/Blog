import Link from 'next/link';

export default async function SearchPage({ searchParams }) {
    const { q = '' } = await searchParams;

  if (!q) {
    return <p className="p-8 text-gray-500">Enter a search term above.</p>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/search?q=${encodeURIComponent(q)}`,
    { cache: 'no-store' }
  );
  const { posts } = await res.json();   

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Results for <span className="text-muted">"{q}"</span>
      </h1>

      {posts.length === 0 ? (
        <p className="text-muted">No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id}>
              <Link href={`/blog/${post.slug}`} className="text-lg text-text-primary font-medium hover:underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">By {post.author.email}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}