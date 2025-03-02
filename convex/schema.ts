import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recipes: defineTable({
    title: v.string(),
    description: v.string(),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    featured: v.optional(v.union(v.boolean(), v.literal("top"))),
    imageStorageId: v.optional(v.id("_storage")),
  }).index("by_featured", ["featured"]),
});
