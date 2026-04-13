import connectDB  from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  try {

  await connectDB();

  const existingUser = await User.findOne({ email });

  
  if (existingUser) {
    return Response.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return Response.json({ message: "User created" });

  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return Response.json({ message: errorMessage }, { status: 500 });
  }
}