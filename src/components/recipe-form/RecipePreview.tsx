import { Step, useRecipeForm } from "@/contexts/RecipeFormContext";

import Image from "next/image";
import Trash from "@/app/components/svg/Trash";
import { Button } from "@/components/ui/button";

export default function RecipePreview() {
  const { title, description, imagePreview, steps, setSteps } = useRecipeForm();

  const handleDeleteStep = (id: string) => {
    setSteps((prev: Step[]) => prev.filter((step) => step.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Recipe Card Preview */}
      <div className="rounded-lg bg-white p-4 grid gap-0 grid-rows-subgrid row-span-2 border-grey/15 border ">
        {imagePreview ? (
          <div>
            <Image
              src={imagePreview}
              alt="Recipe Image"
              width={400}
              height={225}
              className="rounded-md aspect-video object-cover w-full mb-2"
            />
          </div>
        ) : (
          <div className="w-full rounded-md aspect-video bg-grey/25 flex mb-2 items-center justify-center">
            <span className="font-medium text-xs text-grey">
              No image provided.
            </span>
          </div>
        )}
        {title ? (
          <h2 className="text-lg font-medium">{title}</h2>
        ) : (
          <h2 className="text-lg font-medium text-grey/50">
            No Title Provided
          </h2>
        )}
        {description ? (
          <p className="text-sm text-grey">{description}</p>
        ) : (
          <p className="text-sm text-grey/50">
            No Description Provided. Write one for people to know what makes
            your recipe unique.
          </p>
        )}
      </div>
      {/* Steps to add to the recipe */}
      {steps?.length > 0 ? (
        <div className="px-4">
          <h3 className="text-grey text-lg font-medium">Preparation Steps</h3>
          <ol className="text-xs ml-4">
            {steps.map(({ id, content }, index) => (
              <li key={index} className="group">
                <div className="flex items-center gap-2">
                  <span className="flex-grow">{content}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteStep(id)}
                    className="group-hover:opacity-100 opacity-0"
                  >
                    <Trash />
                  </Button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="flex flex-col justify-center px-4">
          <h3 className="text-grey/50 text-lg font-medium">
            No steps provided.
          </h3>
          <p className="text-sm text-grey/50">
            Add some to tell people how to prepare your recipe.
          </p>
        </div>
      )}
    </div>
  );
}
