"use client";

import { useMutation } from "convex/react";
import { useState, useRef } from "react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

// import Button from "./Button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import Trash from "./svg/Trash";
import { IndexRange } from "convex/server";

interface RecipeStep {
  id: string;
  content: string;
}

export default function RecipeForm() {
  const router = useRouter();

  const generateUploadUrl = useMutation(api.recipes.generateUploadUrl);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const stepInput = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<RecipeStep[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const addRecipe = useMutation(api.recipes.createRecipe);

  const handleAddStep = () => {
    const inputValue = stepInput.current?.value;

    if (!inputValue) return;

    setSteps((prev) => [
      ...(prev || []),
      { id: crypto.randomUUID(), content: inputValue },
    ]);

    if (stepInput.current) {
      stepInput.current.value = "";
    }
  };

  const handleDeleteStep = (id: string) => {
    setSteps((prev) => prev.filter((step) => step.id !== id));
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
    <div className="grid grid-cols-2 gap-8">
      <form
        className="max-w-sm mt-8 grid grid-cols-1 gap-4"
        onSubmit={handleSubmit}
      >
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
            onChange={(event) =>
              setSelectedImage(event.target.files?.[0] || null)
            }
            required
          />
        </div>
        <div className="grid items-center gap-1">
          <label htmlFor="ingredients">Steps</label>
          <div className="flex gap-2">
            <Input
              type="text"
              name="steps"
              placeholder="Eg. Mix all ingredients together..."
              ref={stepInput}
              required
            />
            <Button type="button" variant="outline" onClick={handleAddStep}>
              Add Step
            </Button>
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          Create Recipe
        </Button>
      </form>

      {/* Steps to add to the recipe */}
      {steps?.length > 0 ? (
        <ol>
          {steps.map(({ id, content }, index) => (
            <li key={index}>
              <div className="flex items-center gap-2">
                <span className="flex-grow">{content}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteStep(id)}
                >
                  <Trash />
                </Button>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="flex flex-col justify-center">
          <h3 className="text-grey text-xl font-medium">No steps provided.</h3>
          <p className="text-grey font-light">
            Add some to tell people how to prepare your recipe.
          </p>
        </div>
      )}
    </div>
  );
}
