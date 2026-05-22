# Blog CMS – Full Stack Web Application

A full-stack Blog Content Management System built with **Next.js** that allows users to register, log in, and manage blog posts. The project demonstrates authentication, database integration, REST API design, and deployment using modern web development tools.

## Live Demo

https://blogcms-mocha.vercel.app/

**Demo Accounts** *(for demo purposes only)*

| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@gmail.com | admin |
| User  | test@gmail.com  | test  |

## GitHub Repository

https://github.com/Davideif/Blog

---

## Features

- User **authentication (login & register)** using NextAuth
- **Create, edit, and delete** blog posts
- **Rich text editing** with Tiptap
- **Image uploads** via Cloudinary
- **Protected routes** enforced by middleware (unauthenticated users are redirected to login)
- REST API routes for backend logic
- MongoDB database integration using Mongoose
- Responsive UI built with Tailwind CSS
- Deployed to production using Vercel
- Environment variables for secure configuration

---

## Tech Stack

**Frontend**
- Next.js (App Router)
- JavaScript
- Tailwind CSS
- Tiptap (rich text editor)

**Backend**
- Next.js API Routes
- NextAuth Authentication
- REST API Architecture

**Database**
- MongoDB
- Mongoose ODM

**Storage**
- Cloudinary (image uploads)

**Deployment**
- Vercel

---

## Project Architecture

The application uses the **Next.js App Router** architecture and separates frontend UI from backend logic through API routes.

Key components include:

- Authentication system using NextAuth with middleware-based route protection
- API routes for CRUD operations on blog posts
- MongoDB database models using Mongoose
- Cloudinary integration for image storage and delivery
- Tiptap rich text editor for post content
- Client and server components for efficient rendering

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Davideif/Blog.git
cd Blog
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.