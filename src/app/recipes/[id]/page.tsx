import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const recipe = await fetchQuery(api.recipes.getSingleRecipe, {
    id: id,
  });

  if (!recipe) {
    return <div>Recipe not found</div>;
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
