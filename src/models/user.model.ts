import mongoose from "mongoose";

export interface IUser {
  username: string;
  name: string;
  bio: string;
  password: string;
  email: string;
  phone: string;
  profilePicture: string;
  likes: number;
  followers: number;
  favoriteRecipes: string[];
  following: string[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    likes: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    favoriteRecipes: { type: [], default: [] },
    following: { type: [], default: [] },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model<IUser>("User", userSchema, "user");

export default User;
