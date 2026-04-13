import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      return new Response(JSON.stringify({ error: "Invalid file type" }), { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "blog-images/posts" },
      (error, result) => {
      if (error) reject(error);
      else if (result) resolve(result);
      else reject(new Error("No result from Cloudinary"));
}
    )
    .end(buffer);
});

    return new Response(JSON.stringify({ url: result.secure_url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Upload failed" }), { status: 500 });
  }
}