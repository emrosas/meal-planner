// types/recipe.ts
import { api } from "../../convex/_generated/api";
import { FunctionReturnType } from "convex/server";

export type TopFeaturedRecipe = NonNullable<
  FunctionReturnType<typeof api.recipes.getTopFeaturedRecipes>
>[number];
