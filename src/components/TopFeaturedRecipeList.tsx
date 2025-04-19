"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import RecipeCard from "./RecipeCard";
import { Id } from "../../convex/_generated/dataModel";
import { useMemo } from "react";
import { useAuth } from "@clerk/nextjs";

export default function TopFeaturedRecipeList() {
  const { isSignedIn } = useAuth();
  const recipes = useQuery(api.recipes.getFeaturedRecipes, { limit: 3 });
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
    <ul className="grid sm:grid-cols-3 gap-4 mb-16">
      {recipes?.map((recipe) => {
        return (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            isLiked={likedRecipesIds.has(recipe._id)}
            featured
          />
        );
      })}
    </ul>
  );
}
