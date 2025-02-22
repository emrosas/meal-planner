import { Doc } from "../../../convex/_generated/dataModel";

export default function RecipeCard({ recipe }: { recipe: Doc<"recipes"> }) {
  return (
    <li className="rounded-lg bg-white p-4 flex gap-4">
      <div className="bg-grey rounded-md w-24 aspect-square" />
      <div className="flex flex-col justify-between pt-2">
        <div>
          <h2 className="text-lg font-medium">{recipe.title}</h2>
          <p className="text-sm">{recipe.description}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <span className="text-xs font-gray">Creator Name</span>
          <span className="text-xs font-gray">10-15 minutes</span>
          <span className="text-xs font-gray flex-grow text-right">
            350 Likes
          </span>
        </div>
      </div>
    </li>
  );
}
