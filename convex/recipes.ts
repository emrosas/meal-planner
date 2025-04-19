import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRecipe = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    steps: v.array(v.string()),
    ingredients: v.array(
      v.object({
        id: v.id("ingredients"),
        name: v.string(),
        quantity: v.number(),
        unit: v.union(
          v.literal("pc"),
          v.literal("g"),
          v.literal("kg"),
          v.literal("ml"),
          v.literal("l"),
          v.literal("tsp"),
          v.literal("tbsp"),
          v.literal("cup"),
        ),
      }),
    ),
    time: v.optional(
      v.union(
        v.literal("5 min"),
        v.literal("10-15 min"),
        v.literal("15-30 min"),
        v.literal("30-60 min"),
        v.literal("+60 min"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (user === null) {
      return null;
    }

    const userId = user.tokenIdentifier;

    const recipeId = await ctx.db.insert("recipes", {
      title: args.title,
      description: args.description,
      userId,
      userName: user.name ? user.name : "Anonymous",
      featured: false,
      imageStorageId: args.imageStorageId,
      steps: args.steps,
      ingredients: args.ingredients,
      time: args.time,
    });

    return recipeId;
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getRecipes = query({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, { limit }) => {
    const recipes = await ctx.db.query("recipes").order("desc").take(limit);

    if (!recipes) return null;

    const recipesWithImages = await Promise.all(
      recipes.map(async (recipe) => {
        let imageUrl = null;
        if (recipe.imageStorageId) {
          imageUrl = await ctx.storage.getUrl(recipe.imageStorageId);
        }
        return { ...recipe, imageUrl };
      }),
    );

    return recipesWithImages;
  },
});

export const getFeaturedRecipes = query({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, { limit }) => {
    const recipes = await ctx.db
      .query("recipes")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(limit);

    if (!recipes) {
      return null;
    }
    const recipesWithImages = await Promise.all(
      recipes.map(async (recipe) => {
        let imageUrl = null;
        if (recipe.imageStorageId) {
          imageUrl = await ctx.storage.getUrl(recipe.imageStorageId);
        }
        return { ...recipe, imageUrl };
      }),
    );

    return recipesWithImages;
  },
});

export const getSingleRecipe = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const id = ctx.db.normalizeId("recipes", args.id);
    if (id === null) {
      return null;
    }

    const recipe = await ctx.db.get(id);
    if (!recipe) {
      return null;
    }

    let imageUrl = null;
    if (recipe.imageStorageId) {
      imageUrl = await ctx.storage.getUrl(recipe.imageStorageId);
    }
    return { ...recipe, imageUrl };
  },
});

export const toggleRecipeLike = mutation({
  args: {
    id: v.id("recipes"),
    liked: v.boolean(),
  },
  handler: async (ctx, { id, liked }) => {
    try {
      // Check if user is authenticated
      const user = await ctx.auth.getUserIdentity();
      if (user === null) {
        console.error("User not authenticated");
        return { success: false, error: "User not authenticated" };
      }

      const userId = user.tokenIdentifier;

      // Check if recipe exists
      const recipe = await ctx.db.get(id);
      if (!recipe) {
        console.error(`Recipe not found: ${id}`);
        return { success: false, error: "Recipe not found" };
      }

      console.log(`Processing ${liked ? "like" : "unlike"} for recipe ${id}`);

      // Update recipe likes counter
      await ctx.db.patch(recipe._id, {
        likes: Math.max(
          0,
          liked ? (recipe.likes || 0) + 1 : (recipe.likes || 1) - 1,
        ),
      });

      console.log(
        `Updated recipe likes count to ${liked ? (recipe.likes || 0) + 1 : (recipe.likes || 1) - 1}`,
      );

      // Check if user has an existing favorites document
      const favoriteRow = await ctx.db
        .query("favorites")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .unique();

      console.log(`Found favorites document: ${favoriteRow ? "yes" : "no"}`);

      if (!favoriteRow) {
        const favoriteId = await ctx.db.insert("favorites", {
          userId,
          likedRecipes: liked ? [id] : [],
        });

        console.log(`Created favorites document: ${favoriteId}`);
        return { success: true };
      }

      // Check liked recipes
      const currentLikedRecipes = favoriteRow.likedRecipes || [];

      // Check if recipe is in favorites to prevent duplicates
      const isRecipeInFavorites = currentLikedRecipes.some(
        (r) => r.toString() === id.toString(),
      );

      console.log(`Recipe in favorites: ${isRecipeInFavorites}`);

      let updatedLikedRecipes;
      if (liked && !isRecipeInFavorites) {
        updatedLikedRecipes = [...currentLikedRecipes, id];
        console.log(`Added recipe ${id} to favorites`);
      } else if (!liked && isRecipeInFavorites) {
        updatedLikedRecipes = currentLikedRecipes.filter(
          (r) => r.toString() !== id.toString(),
        );
        console.log(`Removed recipe ${id} from favorites`);
      } else {
        console.log("No change to favorites needed");
        return { success: true };
      }

      // Toggle recipe in user's favorites
      await ctx.db.patch(favoriteRow?._id, {
        likedRecipes: updatedLikedRecipes,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error in toggleRecipeLike", error);
      return { success: false, error: String(error) };
    }
  },
});

export const getUserFavorites = query({
  args: {
    includeData: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user || args.includeData === false) {
      return { likedRecipes: [] };
    }

    const userId = user.tokenIdentifier;

    const userFavorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!userFavorites) {
      console.log("User has no favorites");
      return { likedRecipes: [] };
    }

    return { likedRecipes: userFavorites.likedRecipes };
  },
});
