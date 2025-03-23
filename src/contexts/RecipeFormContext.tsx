import { RecipeIngredient } from "@/types/recipe";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface Step {
  id: string;
  content: string;
}

interface RecipeFormContextType {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
  steps: Step[];
  setSteps: Dispatch<SetStateAction<Step[]>>;
  ingredients: RecipeIngredient[];
  setIngredients: Dispatch<SetStateAction<RecipeIngredient[]>>;
}

const RecipeFormContext = createContext<RecipeFormContextType | undefined>(
  undefined,
);

export function RecipeFormProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <RecipeFormContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        selectedImage,
        setSelectedImage,
        imagePreview,
        setImagePreview,
        steps,
        setSteps,
        ingredients,
        setIngredients,
      }}
    >
      {children}
    </RecipeFormContext.Provider>
  );
}

export function useRecipeForm() {
  const context = useContext(RecipeFormContext);
  if (context === undefined) {
    throw new Error("useRecipeForm must be used within a RecipeFormProvider");
  }
  return context;
}

export default RecipeFormContext;
