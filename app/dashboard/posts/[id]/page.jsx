import Post from '@/components/Post';

export default async function PostPage({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN || ''}/api/posts/${params.id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return <p>Not found</p>;
  const doc = await res.json();

  const post = {
    _id: doc._id,
    title: doc.title,
    content: doc.content,
    author: doc.author || null,
    createdAt: doc.createdAt,
  };

  return <Post post={post} />;
}