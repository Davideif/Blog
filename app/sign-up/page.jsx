"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})}
      />
      <input
        placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})}
      />
      <button>Sign Up</button>
    </form>
  );
}