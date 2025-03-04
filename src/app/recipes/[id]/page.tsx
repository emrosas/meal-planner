import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Recipe } from "@/types/recipe";

import Image from "next/image";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: RecipePageProps) {
  const id = (await params).id;

  const recipe: Recipe | null = await fetchQuery(api.recipes.getSingleRecipe, {
    id: id,
  });

  if (!recipe) {
    return (
      <main className="flex flex-col flex-grow">
        <div>Recipe not found: {id}</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col flex-grow">
      <div className="~px-4/64 pb-16 flex gap-8">
        {recipe.imageUrl && (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={400}
            height={225}
            className="rounded-lg"
          />
        )}
        <div className="mt-8">
          <h1 className="font-besley font-semibold text-3xl mb-2">
            {recipe.title}
          </h1>
          <p>{recipe.description}</p>
        </div>
      </div>
      <div id="recipes" className="~px-4/64 bg-light py-16 flex-grow"></div>
    </main>
  );
}
