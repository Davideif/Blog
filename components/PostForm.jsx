'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { TiptapEditor } from "@/components/rich-text-editor";
import { toast } from 'react-toastify';

export default function PostForm({ post, postId }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {postId ? "Edit Post" : "Create New Post"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-900 font-medium mb-2">
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
            className="w-full px-4 py-2 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <div className="max-w-3xl mx-auto mt-10">
            <TiptapEditor
              value={formData.content}
              onChange={(html) =>
                setFormData(prev => ({
                  ...prev,
                  content: html,
                }))
              }
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!formData.title || !formData.content}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition
            ${formData.title && formData.content
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"}`}
        >
          {postId ? "Update Post" : "Submit Post"}
        </button>
      </form>
    </div>
  );
}