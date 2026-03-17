import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
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
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "blog-images/posts",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
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