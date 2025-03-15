"use client";

import { useMutation } from "convex/react";
import { useState, useRef } from "react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

// import Button from "./Button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormIngredient,
  Step,
  useRecipeForm,
} from "@/contexts/RecipeFormContext";
import IngredientSelect from "@/components/recipe-form/IngredientSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RecipeForm() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    setSteps,
    ingredients,
    setIngredients,
    selectedImage,
    setSelectedImage,
    setImagePreview,
  } = useRecipeForm();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<FormIngredient | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);
  const stepInput = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const generateUploadUrl = useMutation(api.recipes.generateUploadUrl);
  const addRecipe = useMutation(api.recipes.createRecipe);

  const handleAddStep = () => {
    const inputValue = stepInput.current?.value;

    if (!inputValue) return;

    setSteps((prev: Step[]) => [
      ...prev,
      { id: uuidv4(), content: inputValue },
    ]);

    if (stepInput.current) {
      stepInput.current.value = "";
    }
  };

  const handleIngredientSelect = (ingredient: FormIngredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    let imageStorageId;

    if (selectedImage && selectedImage.size > 0) {
      if (selectedImage.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        setIsLoading(false);
        return;
      }
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });
      const { storageId } = await result.json();
      imageStorageId = storageId;
    }

    const recipe = await addRecipe({ title, description, imageStorageId });

    if (!recipe) {
      alert("Failed to create recipe");
      setIsLoading(false);
      return;
    }

    console.log(recipe);

    setTitle("");
    setDescription("");
    setSelectedImage(null);
    setIsLoading(false);

    router.push("/recipes/" + recipe);
  };

  return (
    <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid items-center gap-1">
        <label htmlFor="title">Title</label>
        <Input
          type="text"
          name="title"
          placeholder="Eg. California Sushi Rolls"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="grid items-center gap-1">
        <label htmlFor="description">Description</label>
        <Textarea
          name="description"
          rows={4}
          placeholder="Eg. A delicious, fresh and easy-to-make recipe that will impress your guests."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="resize-none"
          required
        />
      </div>
      <div className="grid items-center gap-1">
        <label htmlFor="image">Image</label>
        <Input
          type="file"
          accept="image/*"
          ref={imageInput}
          name="image"
          placeholder="Select a file..."
          onChange={(event) => {
            const file = event.target.files?.[0] || null;
            setSelectedImage(file);

            if (file) {
              const previewUrl = URL.createObjectURL(file);
              setImagePreview(previewUrl);
            } else {
              setImagePreview(null);
            }
          }}
          required
        />
      </div>
      <div className="grid items-center gap-1">
        <label htmlFor="steps">Preparation Steps</label>
        <div className="flex gap-2">
          <Input
            type="text"
            name="steps"
            placeholder="Eg. Mix all ingredients together..."
            ref={stepInput}
            required
          />
          <Button type="button" variant="outline" onClick={handleAddStep}>
            Add
          </Button>
        </div>
      </div>
      <div>
        <label htmlFor="ingredients">Ingredients</label>
        <div className="grid grid-cols-[3fr_2fr_2fr_1fr] gap-2">
          <IngredientSelect
            onSelectIngredient={handleIngredientSelect}
            placeholder="Search ingredients..."
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Meas." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pc">Piece(s)</SelectItem>
              <SelectItem value="g">Grams</SelectItem>
              <SelectItem value="kg">Kilograms</SelectItem>
              <SelectItem value="ml">Milliliters</SelectItem>
              <SelectItem value="l">Liters</SelectItem>
              <SelectItem value="tsp">Teaspoons</SelectItem>
              <SelectItem value="tbsp">Tablespoons</SelectItem>
              <SelectItem value="cup">Cups</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Amount"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button type="button" variant="outline" onClick={handleAddStep}>
            Add
          </Button>
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        Create Recipe
      </Button>
    </form>
  );
}
