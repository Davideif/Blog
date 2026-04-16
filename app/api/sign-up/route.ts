import connectDB  from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { message: "Request body must be a JSON object." },
      { status: 400 }
    );
  }


  const { name, email, password } = body as { name?: string; email?: string; password?: string };

     if (typeof name !== "string" || typeof password !== "string" || typeof email !== "string") {
    return NextResponse.json(
      { message: "Name, email,  and password must be strings." },
      { status: 400 }
    );  
  }


   if (name !== undefined && !name.trim() || email !== undefined && !email.trim() || password !== undefined && !password.trim()) {
        return NextResponse.json({ error: "Name, email, and password cannot be empty" }, {
          status: 400,
        });
      }


  if (!email?.includes("@")) {
    return NextResponse.json(
      { message: "Invalid email address." },
      { status: 400 }
    );
  } 

 
 
  
  try {

  await connectDB();

  const existingUser = await User.findOne({ email });

  
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "User created" }, { status: 201 });

  } catch (error) {

    console.error("[POST /api/sign-up]", error);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}