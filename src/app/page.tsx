import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";

export default function Home() {
  return (
    <main className="~px-4/64">
      <div>
        <h1 className="font-besley font-semibold text-3xl">
          Simplify Meal Planning and Grocery List generation.
        </h1>
        <p className="font-light">
          Creating and managing your weekly meals has never been simpler. Just
          select your favorite recipes, adjust the servings and go shopping.
        </p>
      </div>
      <RecipeForm />
      <RecipeList />
    </main>
  );
}
