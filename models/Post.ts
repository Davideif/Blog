import mongoose, {HydratedDocument} from 'mongoose';
import slugify from 'slugify';

export interface IPost {
  _id: mongoose.Types.ObjectId;
  title: string;
  author: mongoose.Types.ObjectId;
  slug: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostPopulated extends Omit<IPost, 'author'> {
  author: {
    _id: mongoose.Types.ObjectId
    email: string
  }
}

const { Schema } = mongoose;

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
     author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
postSchema.pre('validate', async function (this: HydratedDocument<IPost>, next: Function) {
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


export default mongoose.models.Post as mongoose.Model<IPost> || mongoose.model<IPost>('Post', postSchema) ;
