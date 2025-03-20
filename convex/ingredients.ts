import { query } from "./_generated/server";
import { v } from "convex/values";

export const getSingleIngredient = query({
  args: {
    id: v.id("ingredients"),
  },
  handler: async (ctx, args) => {
    const ingredient = await ctx.db.get(args.id);
    return ingredient;
  },
});

// export const createIngredient = mutation({
//   args: {
//     name: v.string(),
//   },
//   handler: async (ctx, args) => {
//     return await ctx.db.insert("ingredients", { name: args.name });
//   },
// });

export const getIngredient = query({
  args: {
    nameQuery: v.string(),
  },
  handler: async (ctx, { nameQuery }) => {
    if (!nameQuery || nameQuery.length < 2) {
      return ctx.db.query("ingredients").take(5);
    }

    const results = await ctx.db
      .query("ingredients")
      .withSearchIndex("search_ingredients", (q) => q.search("name", nameQuery))
      .take(5);

    return results;
  },
});
