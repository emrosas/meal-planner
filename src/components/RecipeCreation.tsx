"use client";

import RecipePreview from "./recipe-form/RecipePreview";
import RecipeForm from "@/components/RecipeForm";
import { RecipeFormProvider } from "@/contexts/RecipeFormContext";

export default function RecipeCreation() {
  return (
    <RecipeFormProvider>
      <div className="grid grid-cols-2 gap-16 pb-8">
        <div>
          <RecipeForm />
        </div>
        <RecipePreview />
      </div>
    </RecipeFormProvider>
  );
}
