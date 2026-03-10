import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        
       
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            MyBlog CMS
          </h2>

        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-medium mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link href="#" className="hover:text-white">About</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-medium mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white">Contact</Link></li>
            <li><Link href="#" className="hover:text-white">RSS Feed</Link></li>
          </ul>
        </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center text-sm py-6">
        © {new Date().getFullYear()} Blog CMS. All rights reserved.
      </div>
      </div>
    </footer>
  );
}