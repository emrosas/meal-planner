import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const recipe = await fetchQuery(api.recipes.getSingleRecipe, {
    id: id,
  });

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <main className="~px-4/64 pb-16">
      <h1 className="font-besley font-semibold text-3xl mb-2">
        {recipe.title}
      </h1>
      <p>{recipe.description}</p>
    </main>
  );
}
