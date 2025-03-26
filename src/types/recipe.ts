// types/recipe.ts
import { api } from "../../convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { Doc } from "../../convex/_generated/dataModel";

export type TopFeaturedRecipe = NonNullable<
  FunctionReturnType<typeof api.recipes.getTopFeaturedRecipes>
>[number];

export type Recipe = NonNullable<
  FunctionReturnType<typeof api.recipes.getSingleRecipe>
>;

// Ingredients
type DocRecipe = Doc<"recipes">;
type RecipeIngredients = NonNullable<DocRecipe["ingredients"]>;

export type RecipeIngredient =
  RecipeIngredients extends Array<infer T> ? T : never;

// Unit for the Ingredients
export type Unit = RecipeIngredient["unit"];

// Time to complete recipe
export type Time = NonNullable<DocRecipe["time"]>;

export const TIME_OPTIONS: Time[] = [
  "5 min",
  "10-15 min",
  "15-30 min",
  "30-60 min",
  "+60 min",
];

export type Ingredient = NonNullable<
  FunctionReturnType<typeof api.ingredients.getSingleIngredient>
>;
