"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

      if (res.status === 409) {
        toast.error("User already exists");
        return;
      }

      if (res.status === 500) {
        toast.error("An error occurred while creating the account, try it later");
        return;
      }

      if (res.ok) {
        toast.success("Account created successfully");
         router.push("/login");
      }

    } catch (error) {
      toast.error("An error occurred while creating the account");
    }
   
  };

return (
  <div className="flex-1 flex items-center justify-center bg-surface px-4 py-16">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-surface border border-border p-8 rounded-2xl shadow-sm space-y-6"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold text-text-primary">
          Create an account
        </h2>
        <p className="text-sm text-text-muted">
          Fill in the details below to get started
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Name
        </label>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Email
        </label>
        <input
          placeholder="you@example.com"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-500 text-white py-2.5 rounded-lg font-medium hover:bg-brand-600 active:scale-[0.98] transition-all"
      >
        Sign Up
      </button>

    </form>
  </div>
); }