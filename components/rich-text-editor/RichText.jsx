export default function RichText({ content, preview = false }) {
  return (
    <div
      className={`prose max-w-none ${preview ? "prose-sm line-clamp-3" : ""}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}