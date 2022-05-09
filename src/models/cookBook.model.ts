import { model, Schema } from "mongoose";

export interface ICookBookModel {
  title: string;
  description: string;
  image: string;
  userId: string;
  recipes: string[];
}

const cookBookSchema = new Schema<ICookBookModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: String, required: true, ref: "User" },
    recipes: { type: [], ref: "Recipe", default: [] },
  },
  {
    versionKey: false,
  }
);

const CookBook = model<ICookBookModel>("CookBook", cookBookSchema, "cook_book");

export default CookBook;
