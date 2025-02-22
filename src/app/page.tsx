import RecipeList from "./components/RecipeList";

export default function Home() {
  return (
    <main>
      <div className="~px-4/64 pb-16">
        <h1 className="font-besley font-semibold text-3xl mb-2">
          Simplify Meal Planning and Grocery List generation.
        </h1>
        <p className="font-light text-balance max-w-prose">
          Creating and managing your weekly meals has never been simpler. Just
          select your favorite recipes, adjust the servings and go shopping.
        </p>
      </div>
      <div className="~px-4/64 bg-light py-16">
        <RecipeList />
      </div>
    </main>
  );
}
