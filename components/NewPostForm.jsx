'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function NewPostForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Update state when inputs change
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.message);
        alert("Error: " + data.message);
        return;
      }

      console.log("Post created:", data.post);
       alert("New post created");
       router.push('/');

      // reset form
      setFormData({ title: "", content: "" });

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
        Submit Post
      </button>
    </form>
  );
}
