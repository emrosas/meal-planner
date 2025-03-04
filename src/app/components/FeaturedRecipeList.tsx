"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import RecipeCard from "./RecipeCard";

export default function FeaturedRecipeList() {
  const recipes = useQuery(api.recipes.getFeaturedRecipes);

  return (
    <ul className="grid grid-cols-2 gap-8">
      {recipes?.map((recipe) => {
        return <RecipeCard key={recipe._id} recipe={recipe} />;
      })}
    </ul>
  );
}
