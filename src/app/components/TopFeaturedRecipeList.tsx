"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import RecipeCard from "./RecipeCard";

export default function TopFeaturedRecipeList() {
  const recipes = useQuery(api.recipes.getTopFeaturedRecipes);

  return (
    <ul className="grid sm:grid-cols-3 gap-4 mb-16">
      {recipes?.map((recipe) => {
        return <RecipeCard key={recipe._id} recipe={recipe} featured />;
      })}
    </ul>
  );
}
