import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Recipe } from "@/types/recipe";

import Image from "next/image";
import Heart from "@/components/svg/Heart";
import Clock from "@/components/svg/Clock";
import User from "@/components/svg/User";

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
            className="rounded-lg aspect-video object-cover"
          />
        )}
        <div className="mt-8">
          <h1 className="font-besley font-semibold text-3xl mb-2">
            {recipe.title}
          </h1>
          <p>{recipe.description}</p>
          <div className="flex gap-6 mt-4">
            <span className="font-gray flex gap-1 items-center">
              <User className="size-5" />
              {recipe.userName ? recipe.userName : "Anonymous"}
            </span>
            <span className="font-gray flex gap-1 items-center">
              <Clock className="size-5" />
              {recipe.time ? recipe.time : "Until Done"}
            </span>
            <span className="font-gray justify-end flex-grow text-right flex gap-1 items-center">
              350
              <Heart className="size-5" />
            </span>
          </div>
        </div>
      </div>
      <div className="~px-4/64 bg-light py-16 flex-grow grid-cols-[400px_auto] gap-8 grid">
        {recipe?.ingredients && (
          <div>
            <h2 className="text-3xl font-besley font-bold mb-4">Ingredients</h2>
            <ul className="list-disc capitalize max-w-80">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <div className="flex items-center gap-8 justify-between">
                    <span>{ingredient.name}</span>
                    <span className="">
                      {ingredient.quantity}
                      {ingredient.unit}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {recipe?.steps && (
          <div>
            <h2 className="text-3xl font-besley font-bold mb-4">
              Preparation Steps
            </h2>
            <ul className="list-disc">
              {recipe.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
