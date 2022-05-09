export class CreateRecipeInput {
  title: string;
  description: string;
  images?: string[];
  ingredients?: string[];
  additionalInfo: {
    timeToCook: number;
  };
}
