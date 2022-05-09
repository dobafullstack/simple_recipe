import { model, Schema } from "mongoose";

export interface IAdditionalInfo {
  timeToCook: number;
  nutritionFacts: string[];
  tags: string[];
}

export interface IRecipe {
  title: string;
  description: string;
  images: string[];
  ingredients: string[];
  authorId: string;
  likes: number;
  comments: number;
  createdAt: number;
  additionalInfo: IAdditionalInfo;
}

const additionInfoSchema = new Schema<IAdditionalInfo>(
  {
    timeToCook: { type: Number, required: true },
    nutritionFacts: { type: [], default: [] },
    tags: { type: [], default: [] },
  },
  { _id: false, versionKey: false }
);

const recipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorId: { type: String, ref: "User", required: true },
    images: { type: [], default: [] },
    ingredients: { type: [], default: [] },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    createdAt: { type: Number, default: new Date().getTime() },
    additionalInfo: { type: additionInfoSchema, required: true },
  },
  {
    versionKey: false,
  }
);

const Recipe = model<IRecipe>("Recipe", recipeSchema, "recipe");

export default Recipe;
