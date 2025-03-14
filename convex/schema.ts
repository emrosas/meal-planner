import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ingredients: defineTable({
    name: v.string(),
    category: v.union(
      v.literal("fruit"),
      v.literal("vegetable"),
      v.literal("protein"),
      v.literal("dairy"),
      v.literal("grain"),
      v.literal("spice"),
    ),
  }).searchIndex("search_ingredients", {
    searchField: "name",
    filterFields: ["category"],
  }),
  recipes: defineTable({
    title: v.string(),
    description: v.string(),
    steps: v.optional(v.array(v.string())),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    featured: v.optional(v.union(v.boolean(), v.literal("top"))),
    imageStorageId: v.optional(v.id("_storage")),
  }).index("by_featured", ["featured"]),
});
