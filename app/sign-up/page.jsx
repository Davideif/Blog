"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/sign-up`, {
      method: "POST",
      body: JSON.stringify(form),
    });

    router.push("/login");
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-5"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Create an account
      </h2>
      <label   className="text-sm font-medium text-gray-900">Name</label>
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                    text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-transparent transition"
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
      <label   className="text-sm font-medium text-gray-900">Email</label>
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                    text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-transparent transition"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />
      <label   className="text-sm font-medium text-gray-900">Password</label>
      <input
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                  text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-transparent transition"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg
                   font-medium hover:bg-blue-700 active:scale-[0.98]
                   transition duration-200"
      >
        Sign Up
      </button>
    </form>
  </div>
);
}