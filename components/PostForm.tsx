'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { TiptapEditor } from "@/components/rich-text-editor";
import { toast } from 'react-toastify';
import { IPostPopulated } from "@/models/Post";


export default function PostForm({ post, postId }: { post?: IPostPopulated; postId?: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await fetch(
        postId
          ? `${process.env.NEXT_PUBLIC_API_DOMAIN}/posts/${postId}`
          : `${process.env.NEXT_PUBLIC_API_DOMAIN}/posts`,
        {
          method: postId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.message);
        alert("Error: " + data.message);
        return;
      }

      toast.success(postId ? "Post updated" : "New post created");
      router.push('/');
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to submit form.");
    }
  }

  return (
   <div className="max-w-xl mx-auto mt-10 p-8 bg-surface border border-border rounded-xl shadow-sm">
  <h2 className="text-2xl font-semibold text-text-primary mb-6">
    {postId ? "Edit Post" : "Create New Post"}
  </h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter the title"
        autoFocus
        className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
      />
    </div>

    <div>
      <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-2">
        Content
      </label>
      <div className="rounded-lg border border-border overflow-hidden">
        <TiptapEditor
          value={formData.content}
          onChange={(html: string) => setFormData(prev => ({ ...prev, content: html }))}
        />
      </div>
    </div>

    <button
      type="submit"
      disabled={!formData.title || !formData.content}
      className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors bg-brand-500 hover:bg-brand-600 disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed"
    >
      {postId ? "Update Post" : "Submit Post"}
    </button>

  </form>
</div>);
}