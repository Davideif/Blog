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

    
  if (res?.error) {
    toast.error("Invalid email or password");
    return;
  }

  toast.success("Logged in successfully!");
  router.push("/dashboard");
  };

return (
 <div className="flex-1 flex items-center justify-center px-4 py-16 bg-surface">
  <form
    onSubmit={handleLogin}
    className="w-full max-w-md bg-surface rounded-lg p-8 space-y-6 shadow-md"
  >
    <div className="text-center space-y-1">
      <h1 className="text-2xl font-semibold text-text-primary">Login</h1>
      <p className="text-sm text-text-muted">Sign in to your account</p>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-brand-500 text-white py-2.5 rounded-lg font-medium hover:bg-brand-600 active:scale-[0.98] transition-all"
    >
      Login
    </button>

    <p className="text-center text-sm text-text-muted">
      Don't have an account?{" "}
      <Link href="/sign-up" className="font-medium text-brand-500 hover:underline">
        Sign up
      </Link>
    </p>
  </form>
</div>
)};