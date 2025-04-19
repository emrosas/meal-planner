import { useState } from "react";
import { Button } from "./ui/button";
import Heart from "./svg/Heart";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import HeartSolid from "./svg/HeartSolid";

interface LikeButtonProps {
  recipeId: Id<"recipes">;
  initialLikes: number;
  initialLiked: boolean;
}

export default function LikeButton({
  recipeId,
  initialLikes,
  initialLiked,
}: LikeButtonProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const likeRecipe = useMutation(api.recipes.toggleRecipeLike);

  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (isSubmitting) return;

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsSubmitting(true);

    try {
      await likeRecipe({ id: recipeId, liked: newLikedState });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      className="text-xs font-gray"
      variant={"ghost"}
      onClick={handleLike}
    >
      {likes > 0 ? likes : "Like"}
      {isLiked ? (
        <HeartSolid className="size-4 text-red-600" />
      ) : (
        <Heart className="size-4" />
      )}
    </Button>
  );
}
