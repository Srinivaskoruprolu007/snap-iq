import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),

    plan: v.union(v.literal("free"), v.literal("premium")),

    // usage tracking plan limits
    projectsUsed: v.number(),
    exportsThisMonth: v.number(),

    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .searchIndex("search_name", { searchField: "name" })
    .searchIndex("search_email", { searchField: "email" }),

  // projects table
  projects: defineTable({
    title: v.string(),
    userId: v.id("users"),

    canvasState: v.any(),
    width: v.number(),
    height: v.number(),

    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),

    activeTransformations: v.optional(v.string()),

    backgroundRemoved: v.optional(v.boolean()),

    folderId: v.optional(v.id("folders")),
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
  .index("by_userId", ["userId"])
  .index("by_folderId", ["folderId"]),


  // folders table
  folders: defineTable({
    name: v.string(),
    userId: v.id("users"),
    createdAt: v.number(),
  })
  .index("by_userId", ["userId"]),
});

/*
- plan limitations
  - free: 3 project, 20 export per month, basic features
  - premium: unlimited projects, exports, advanced features
 */