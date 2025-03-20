"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Ingredient } from "@/types/recipe";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface IngredientSelectProps {
  onSelectIngredient: (ingredient: Ingredient) => void;
  placeholder?: string;
}

export default function IngredientSelect({
  onSelectIngredient,
  placeholder = "Search ingredients...",
}: IngredientSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const searchTerm =
    debouncedSearchQuery.length >= 2 ? debouncedSearchQuery : "";

  const ingredientsResult = useQuery(api.ingredients.getIngredient, {
    nameQuery: searchTerm,
  });

  const isSearching = searchTerm.length > 0;
  const isLoading = isSearching && ingredientsResult === undefined;
  const ingredients = ingredientsResult || [];

  const selectedIngredient = ingredients.find(
    (ing) => ing._id === selectedIngredientId,
  );
  const displayValue = selectedIngredient?.name || "";

  const handleSelectIngredient = (selectedId: string) => {
    const selectedIngredient = ingredients.find(
      (ing) => ing._id === selectedId,
    );

    if (selectedIngredient) {
      setSelectedIngredientId(selectedId);
      onSelectIngredient(selectedIngredient);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between capitalize"
        >
          {displayValue || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search Ingredients..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>
              {searchQuery.length === 0
                ? "Start typing to search"
                : searchQuery.length < 2
                  ? "Type at least 2 characters"
                  : "No ingredients found"}
            </CommandEmpty>
            <CommandGroup>
              {isLoading && <CommandItem>Loading...</CommandItem>}
              {ingredients.map((ingredient) => (
                <CommandItem
                  key={ingredient._id}
                  value={ingredient._id}
                  onSelect={handleSelectIngredient}
                  className="capitalize"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedIngredientId === ingredient._id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {ingredient.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
