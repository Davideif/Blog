export default function RichText({ content, preview = false }: { content: string; preview?: boolean }) {
  return (
    <div
      className={`prose max-w-none ${preview ? "prose-sm line-clamp-3" : ""}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}