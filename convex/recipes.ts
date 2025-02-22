import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRecipe = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("recipes", {
      title: args.title,
      description: args.description,
    });
  },
});

export const getRecipes = query({
  handler: async (ctx) => {
    return await ctx.db.query("recipes").collect();
  },
});
