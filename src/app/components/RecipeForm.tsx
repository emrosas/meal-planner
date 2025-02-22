"use client";

import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import Button from "./Button";

export default function RecipeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addRecipe = useMutation(api.recipes.createRecipe);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addRecipe({ title, description });
    setTitle("");
    setDescription("");
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
      <Button type="submit">Create Recipe</Button>
    </form>
  );
}
