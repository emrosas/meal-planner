import Link from "next/link";
import Image from "next/image";
import type { TopFeaturedRecipe } from "@/types/recipe";

export default function RecipeCard({
  recipe,
  featured,
}: {
  recipe: TopFeaturedRecipe;
  featured?: boolean;
}) {
  return (
    <li className="rounded-lg bg-white p-4 flex gap-4 outline-none outline-offset-1 hover:outline-dark/15">
      <Link
        href={`/recipes/${recipe._id}`}
        className={`flex justify-between gap-4 flex-grow ${featured ? "flex-col" : ""}`}
      >
        {recipe.imageUrl && (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={400}
            height={225}
            className={`rounded-md ${featured ? "w-full" : "w-48"} object-cover h-full aspect-video flex-grow`}
          />
        )}
        <div className="flex-grow flex flex-col">
          <div className="flex-grow">
            <h2 className="text-lg font-medium">{recipe.title}</h2>
            <p className="text-xs text-grey font-light line-clamp-3">
              {recipe.description}
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <span className="text-xs font-gray">
              {recipe.userName ? recipe.userName : "Anonymous"}
            </span>
            <span className="text-xs font-gray">10-15 minutes</span>
            <span className="text-xs font-gray flex-grow text-right">
              350 Likes
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
