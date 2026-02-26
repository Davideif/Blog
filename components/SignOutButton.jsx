"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-4 py-1 border rounded-lg hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
}