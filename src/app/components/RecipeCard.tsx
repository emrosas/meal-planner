import Link from "next/link";
import Image from "next/image";
import type { TopFeaturedRecipe } from "@/types/recipe";
import User from "./svg/User";
import Clock from "./svg/Clock";
import Heart from "./svg/Heart";

export default function RecipeCard({
  recipe,
  featured,
}: {
  recipe: TopFeaturedRecipe;
  featured?: boolean;
}) {
  return (
    <li
      className={`rounded-lg bg-white p-4 grid ${featured ? "gap-0 grid-rows-subgrid row-span-2" : "grid-cols-[auto_1fr] gap-4"}`}
    >
      {recipe.imageUrl && (
        <Link href={`/recipes/${recipe._id}`} className="group">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={400}
            height={225}
            className={`rounded-md ${featured ? "aspect-video" : "aspect-square w-32"} object-cover`}
          />
        </Link>
      )}
      <div className="grid">
        <Link href={`/recipes/${recipe._id}`} className="group mt-4 mb-2">
          <h2 className="text-lg font-medium group-hover:underline group-hover:text-black leading-none">
            {recipe.title}
          </h2>
        </Link>
        <p className="text-xs text-grey font-light line-clamp-3">
          {recipe.description}
        </p>
        <div className="flex gap-4 mt-4">
          <span className="text-xs font-gray flex gap-1 items-center">
            <User className="size-3" />
            {recipe.userName ? recipe.userName : "Anonymous"}
          </span>
          <span className="text-xs font-gray flex gap-1 items-center">
            <Clock className="size-3" />
            10-15 min
          </span>
          <span className="text-xs font-gray justify-end flex-grow text-right flex gap-1 items-center">
            350
            <Heart className="size-4" />
          </span>
        </div>
      </div>
    </li>
  );
}
