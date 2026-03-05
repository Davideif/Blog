"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {

  

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.error) {
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    }
  };


return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Login
        </h1>
        <p className="text-sm text-gray-500">
          Sign in to your account
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-2
                   text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-black
                   focus:border-transparent transition"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 
                     text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-black
                     focus:border-transparent transition"
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2.5 rounded-lg
                   font-medium hover:bg-gray-800
                   active:scale-[0.98] transition-all"
      >
        Login
      </button>

      {/* Sign up redirect */}
      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-black hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  </div>
)};