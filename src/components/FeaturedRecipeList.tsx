"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import RecipeCard from "./RecipeCard";
import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";
import { Id } from "../../convex/_generated/dataModel";

export default function FeaturedRecipeList() {
  const { isSignedIn } = useAuth();

  const recipes = useQuery(api.recipes.getRecipes, { limit: 10 });
  const userFavorites = useQuery(
    api.recipes.getUserFavorites,
    isSignedIn ? { includeData: true } : { includeData: false },
  );

  const likedRecipesIds = useMemo(() => {
    if (!isSignedIn || !userFavorites?.likedRecipes)
      return new Set<Id<"recipes">>();
    return new Set(userFavorites.likedRecipes);
  }, [isSignedIn, userFavorites]);

  if (!recipes) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="grid grid-cols-2 gap-8">
      {recipes?.map((recipe) => {
        return (
          <RecipeCard
            key={recipe._id}
            isLiked={likedRecipesIds.has(recipe._id)}
            recipe={recipe}
          />
        );
      })}
    </ul>
  );
}
