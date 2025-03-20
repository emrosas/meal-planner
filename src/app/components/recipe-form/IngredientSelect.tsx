"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import Plus from "../svg/Plus";
import Minus from "../svg/Minus";

import type { Ingredient } from "@/types/recipe";

interface SelectedIngredient extends Ingredient {
  quantity: number;
}

export default function IngredientSelect() {
  const [nameQuery, setNameQuery] = useState("");
  const [debouncedNameQuery, setDebouncedNameQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[] | null
  >(null);

  const ingredients = useQuery(api.ingredients.getIngredient, {
    nameQuery: debouncedNameQuery,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedNameQuery(nameQuery);
      console.log("Debounced Name Query:", debouncedNameQuery);
    }, 300); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [nameQuery, debouncedNameQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameQuery(e.target.value);
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev) {
        const existingIngredietIndex = prev.findIndex(
          (item) => item._id === ingredient._id,
        );
        if (existingIngredietIndex !== -1) {
          const updatedIngredients = [...prev];
          updatedIngredients[existingIngredietIndex] = {
            ...updatedIngredients[existingIngredietIndex],
            quantity: updatedIngredients[existingIngredietIndex].quantity + 1,
          };
          return updatedIngredients;
        } else {
          return [...prev, { ...ingredient, quantity: 1 }];
        }
      } else {
        return [{ ...ingredient, quantity: 1 }];
      }
    });
  };

  return (
    <>
      {selectedIngredients && selectedIngredients.length > 0 && (
        <ul>
          {selectedIngredients.map((ingredient) => (
            <li key={ingredient._id} className="flex justify-between">
              <div className="flex items-center gap-2">
                <span>{ingredient.quantity}</span>
                <span className="capitalize">{ingredient.name}</span>
              </div>
              <button
                onClick={() =>
                  setSelectedIngredients(
                    selectedIngredients.filter((i) => i._id !== ingredient._id),
                  )
                }
                className="p-1"
              >
                <Minus />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Input
        name="ingredientSearch"
        value={nameQuery}
        onChange={handleInputChange}
        className="my-8"
      />
      {ingredients && (
        <ul className="flex flex-col gap-2">
          {ingredients.map((ingredient) => (
            <li key={ingredient._id} className="flex justify-between">
              <span className="capitalize">{ingredient.name}</span>
              <button
                onClick={() => handleAddIngredient(ingredient)}
                className="p-1"
              >
                <Plus />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
