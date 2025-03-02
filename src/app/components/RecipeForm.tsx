"use client";

import { useMutation } from "convex/react";
import { useState, useRef } from "react";
import { api } from "../../../convex/_generated/api";
import Button from "./Button";

export default function RecipeForm() {
  const generateUploadUrl = useMutation(api.recipes.generateUploadUrl);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addRecipe = useMutation(api.recipes.createRecipe);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let imageStorageId;

    if (selectedImage && selectedImage.size > 0) {
      if (selectedImage.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
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

    console.log(recipe);

    setTitle("");
    setDescription("");
    setSelectedImage(null);
  };

  return (
    <form className="max-w-sm mt-8 space-y-4" onSubmit={handleSubmit}>
      <div className="grid items-center gap-1">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Eg. California Sushi Rolls"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="border border-dark/15 rounded-md px-2 py-1"
        />
      </div>
      <div className="grid items-center gap-1">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows={5}
          placeholder="Eg. A delicious, fresh and easy-to-make recipe that will impress your guests."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          className="border resize-none border-dark/15 rounded-md px-2 py-1"
        />
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          onChange={(event) =>
            setSelectedImage(event.target.files?.[0] || null)
          }
        />
      </div>
      <Button type="submit">Create Recipe</Button>
    </form>
  );
}
