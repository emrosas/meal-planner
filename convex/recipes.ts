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

export const getFeaturedRecipes = query({
  handler: async (ctx) => {
    const recipes = await ctx.db
      .query("recipes")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(10);

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

export const getTopFeaturedRecipes = query({
  handler: async (ctx) => {
    const recipes = await ctx.db
      .query("recipes")
      .withIndex("by_featured", (q) => q.eq("featured", "top"))
      .order("desc")
      .take(3);

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
