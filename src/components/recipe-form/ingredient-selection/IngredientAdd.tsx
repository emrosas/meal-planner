// import { useRecipeForm } from "@/contexts/RecipeFormContext";
import { useState } from "react";
import IngredientSelect from "./IngredientSelect";
import { Ingredient, Unit } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRecipeForm } from "@/contexts/RecipeFormContext";

export default function IngredientAdd() {
  const { setIngredients } = useRecipeForm();
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [quantity, setQuantity] = useState<number | string>("");
  const [unit, setUnit] = useState<Unit | "">("");

  const onSelectIngredient = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    console.log("Selected ingredient:", ingredient);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value === "" ? "" : Number(value));
  };

  const handleUnitChange = (value: string) => {
    setUnit(value as Unit);
  };

  const handleAddIngredient = () => {
    if (!selectedIngredient) return;
    if (!quantity || typeof quantity !== "number") return;
    if (!unit) return;

    console.log("Adding ingredient:", {
      id: selectedIngredient?._id,
      name: selectedIngredient?.name,
      quantity,
      unit,
    });

    setIngredients((prev) => {
      return [
        ...prev,
        {
          id: selectedIngredient._id,
          name: selectedIngredient?.name,
          quantity,
          unit,
        },
      ];
    });
  };

  return (
    <div className="grid grid-cols-[3fr_2fr_2fr_1fr] gap-2">
      <IngredientSelect onSelectIngredient={onSelectIngredient} />
      <Input
        type="number"
        placeholder="Quantity"
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={quantity === "" ? "" : quantity}
        onChange={handleQuantityChange}
      />
      <Select onValueChange={handleUnitChange}>
        <SelectTrigger>
          <SelectValue placeholder="Unit" />
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
      <Button type="button" variant="outline" onClick={handleAddIngredient}>
        Add
      </Button>
    </div>
  );
}
