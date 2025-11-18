import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically generate a unique slug before validation
postSchema.pre('validate', async function (next) {
  if (!this.slug && this.title) {
    let slugCandidate = slugify(this.title, { lower: true, strict: true });
    let slugExists = await mongoose.models.Post.findOne({ slug: slugCandidate });
    let count = 1;

    // Append -1, -2, etc., until the slug is unique
    while (slugExists) {
      slugCandidate = `${slugify(this.title, { lower: true, strict: true })}-${count}`;
      slugExists = await mongoose.models.Post.findOne({ slug: slugCandidate });
      count++;
    }

    this.slug = slugCandidate;
  }
  next();
});

// Prevent OverwriteModelError in Next.js hot reload
export default mongoose.models.Post || mongoose.model('Post', postSchema);
