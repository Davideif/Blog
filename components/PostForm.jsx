'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function PostForm({ post, postId }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // If editing, prefill the form
  useEffect(() => {
    if (post) {
      setFormData({ title: post.title, content: post.content });
    }
  }, [post]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await fetch(postId ? `${process.env.NEXT_PUBLIC_API_DOMAIN}/posts/${postId}` : `${process.env.NEXT_PUBLIC_API_DOMAIN}/posts`, {
        method: postId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label><br />
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter the title"
        autoFocus
      /><br /><br />

      <label htmlFor="content">Content:</label><br/>
      <textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your content here"
        rows="5"
      /><br/>

      <button type="submit" disabled={!formData.title || !formData.content}>
        {postId ? "Update Post" : "Submit Post"}
      </button>
    </form>
  );
}