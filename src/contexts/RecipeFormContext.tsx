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
interface RecipeFormState {
  title: string;
  description: string;
  imagePreview: string | null;
  steps: Step[];
  ingredients: RecipeIngredient[];
}

interface RecipeFormContextType extends RecipeFormState {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  setSteps: Dispatch<SetStateAction<Step[]>>;
  setIngredients: Dispatch<SetStateAction<RecipeIngredient[]>>;
  clearForm: () => void;
}

const RecipeFormContext = createContext<RecipeFormContextType | undefined>(
  undefined,
);

const initialFormState: RecipeFormState = {
  title: "",
  description: "",
  imagePreview: null,
  steps: [],
  ingredients: [],
};

const loadFormState = (): RecipeFormState => {
  if (typeof window === "undefined") return initialFormState;

  const savedState = localStorage.getItem("recipeFormState");
  if (!savedState) return initialFormState;

  try {
    return JSON.parse(savedState);
  } catch (error) {
    console.error("Failed to parse saved form state:", error);
    return initialFormState;
  }
};

export function RecipeFormProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState(() => loadFormState().title);
  const [description, setDescription] = useState(
    () => loadFormState().description,
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    () => loadFormState().imagePreview,
  );
  const [steps, setSteps] = useState<Step[]>(() => loadFormState().steps);
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    () => loadFormState().ingredients,
  );

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setSelectedImage(null);
    setImagePreview(null);
    setSteps([]);
    setIngredients([]);
    localStorage.removeItem("recipeFormState");
  };

  useEffect(() => {
    const formState: RecipeFormState = {
      title,
      description,
      imagePreview,
      steps,
      ingredients,
    };

    localStorage.setItem("recipeFormState", JSON.stringify(formState));
  }, [title, description, imagePreview, steps, ingredients]);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
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
        clearForm,
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
