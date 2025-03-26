import { RecipeIngredient, Time } from "@/types/recipe";
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
  time: Time;
}

interface RecipeFormContextType extends RecipeFormState {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  setSteps: Dispatch<SetStateAction<Step[]>>;
  setIngredients: Dispatch<SetStateAction<RecipeIngredient[]>>;
  setTime: (time: Time) => void;
  clearForm: () => void;
}

const initialFormState: RecipeFormState = {
  title: "",
  description: "",
  imagePreview: null,
  steps: [],
  ingredients: [],
  time: "15-30 min",
};

const RecipeFormContext = createContext<RecipeFormContextType | undefined>(
  undefined,
);

export function RecipeFormProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState(initialFormState.title);
  const [description, setDescription] = useState(initialFormState.description);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialFormState.imagePreview,
  );
  const [steps, setSteps] = useState<Step[]>(initialFormState.steps);
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    initialFormState.ingredients,
  );
  const [time, setTime] = useState<Time>(initialFormState.time);

  // Track if we're on the client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const loadFormState = (): RecipeFormState => {
      try {
        const savedState = localStorage.getItem("recipeFormState");
        if (!savedState) return initialFormState;
        return JSON.parse(savedState);
      } catch (error) {
        console.error("Failed to parse saved form state:", error);
        return initialFormState;
      }
    };

    const savedState = loadFormState();
    setTitle(savedState.title);
    setDescription(savedState.description);
    setImagePreview(savedState.imagePreview);
    setSteps(savedState.steps);
    setIngredients(savedState.ingredients);
    setTime(savedState.time);
  }, []);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setSelectedImage(null);
    setImagePreview(null);
    setSteps([]);
    setIngredients([]);
    setTime("15-30 min");

    if (isClient) {
      localStorage.removeItem("recipeFormState");
    }
  };

  useEffect(() => {
    if (isClient) {
      const formState: RecipeFormState = {
        title,
        description,
        imagePreview,
        steps,
        ingredients,
        time,
      };

      localStorage.setItem("recipeFormState", JSON.stringify(formState));
    }
  }, [title, description, imagePreview, steps, ingredients, time, isClient]);

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        typeof imagePreview === "string" &&
        imagePreview.startsWith("blob:")
      ) {
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
        time,
        setTime,
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
