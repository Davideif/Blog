import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin"; 
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User as mongoose.Model<IUser> ||
  mongoose.model<IUser>("User", UserSchema);