import RecipeCreation from "@/components/RecipeCreation";

export default function CreatePage() {
  return (
    <main className="~px-4/64">
      <div>
        <h1 className="font-besley font-semibold text-3xl mb-2">
          Create a Recipe
        </h1>
        <p className="font-light text-balance max-w-prose">
          Upload your recipe to use in your meal plan. Share it with the world
          and let others enjoy your culinary creations!
        </p>
      </div>
      <RecipeCreation />
    </main>
  );
}
