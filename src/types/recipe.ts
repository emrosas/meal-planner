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

export type Unit = RecipeIngredient["unit"];

export type Ingredient = NonNullable<
  FunctionReturnType<typeof api.ingredients.getSingleIngredient>
>;
