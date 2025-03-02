import RecipeList from "./components/RecipeList";
import FeaturedRecipes from "./components/FeaturedRecipes";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meal Planner App",
  description:
    "Browse recipes, add to your favorites and craft your perfect weekly meal plan.",
};

export default function Home() {
  return (
    <main className="flex-grow flex flex-col">
      <div className="~px-4/64 pb-16">
        <h1 className="font-besley font-semibold text-3xl mb-2">
          Simplify Meal Planning and Grocery List generation.
        </h1>
        <p className="font-light text-balance max-w-prose">
          Creating and managing your weekly meals has never been simpler. Just
          select your favorite recipes, adjust the servings and go shopping.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Link
            href="/create"
            className="bg-dark rounded-md text-white hover:bg-black hover:shadow-sm transition ease-out px-2 py-2 text-sm leading-none"
          >
            Create A Recipe
          </Link>
          <span className="opacity-60">
            or{" "}
            <Link href="/#recipes" className="hover:underline">
              Browse Recipes
            </Link>
          </span>
        </div>
      </div>
      <div id="recipes" className="~px-4/64 bg-light py-16 flex-grow">
        <section className="mb-16">
          <h2 className="text-center mb-8 font-besley font-semibold text-3xl">
            Recipes of The Week
          </h2>
          <FeaturedRecipes />
        </section>
        <section>
          <h2 className="text-center mb-8 font-besley font-semibold text-3xl">
            Featured Recipes
          </h2>
          <RecipeList />
        </section>
      </div>
    </main>
  );
}
