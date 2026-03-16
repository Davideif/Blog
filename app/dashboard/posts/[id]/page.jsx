import Post from '@/components/Post';

export default async function PostPage({ params }) {

  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/posts/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return <p>Not found</p>;

  const post = await res.json();



  return (
    <Post
      post={post}
    />
  );
}
