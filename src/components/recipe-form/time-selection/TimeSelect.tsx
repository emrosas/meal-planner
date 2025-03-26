import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Time, TIME_OPTIONS } from "@/types/recipe";

import { useRecipeForm } from "@/contexts/RecipeFormContext";

export default function TimeSelect() {
  const { setTime, time } = useRecipeForm();

  return (
    <div className="grid items-center gap-1">
      <label htmlFor="time">Time</label>
      <Select
        name="time"
        value={time}
        onValueChange={(value) => setTime(value as Time)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {TIME_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
