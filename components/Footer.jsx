import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-surface-muted border-t border-border mt-20">
  
  {/* Grid columns */}
  <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
    
    <div>
      <h2 className="text-xl font-semibold text-text-primary mb-4">MyBlog CMS</h2>
    </div>

    <div>
      <h3 className="font-medium text-text-primary mb-4">Navigation</h3>
      <ul className="space-y-2 text-sm">
        <li><Link href="/" className="text-text-muted hover:text-text-primary transition-colors">Home</Link></li>
        <li><Link href="/blog" className="text-text-muted hover:text-text-primary transition-colors">Blog</Link></li>
        <li><Link href="/dashboard" className="text-text-muted hover:text-text-primary transition-colors">Dashboard</Link></li>
        <li><Link href="#" className="text-text-muted hover:text-text-primary transition-colors">About</Link></li>
      </ul>
    </div>

    <div>
      <h3 className="font-medium text-text-primary mb-4">Resources</h3>
      <ul className="space-y-2 text-sm">
        <li><Link href="#" className="text-text-muted hover:text-text-primary transition-colors">Privacy Policy</Link></li>
        <li><Link href="#" className="text-text-muted hover:text-text-primary transition-colors">Terms of Service</Link></li>
        <li><Link href="#" className="text-text-muted hover:text-text-primary transition-colors">Contact</Link></li>
        <li><Link href="#" className="text-text-muted hover:text-text-primary transition-colors">RSS Feed</Link></li>
      </ul>
    </div>

  </div>

  {/* Bottom bar — outside the grid, full width */}
  <div className="border-t border-border text-center text-sm text-text-muted py-6">
    © {new Date().getFullYear()} Blog CMS. All rights reserved.
  </div>

</footer>
  );
}