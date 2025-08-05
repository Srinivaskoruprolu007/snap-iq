import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    originalImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    canvasState: v.optional(v.any()),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    file: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);
    if (user.plan === "free") {
      const projectCount = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", user.tokenIdentifier))
        .collect();

      if (projectCount.length > 0 && projectCount[0].projectsUsed >= 3) {
        throw new Error(
          "You have reached the maximum number of projects for your free plan."
        );
      }
    }
    
    // Default title if not provided
    const title = args.title || "Untitled Project";
    
    // Create the project
    const projectId = await ctx.db.insert("projects", {
      title: title,
      userId: user._id,
      originalImageUrl: args.originalImageUrl,
      thumbnailUrl: args.thumbnailUrl,
      canvasState: args.canvasState,
      width: args.width || 800, // Default width
      height: args.height || 600, // Default height
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });

    // Update user's project count
    await ctx.db.patch(user._id, {
      projectsUsed: (user.projectsUsed || 0) + 1,
      lastActiveAt: Date.now(),
    });
    
    return projectId;
  },
});

export const getUserProjects = query({
  handler: async (ctx) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
    return projects;
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found.");
    }
    if (!user || project.userId !== user._id) {
      throw new Error("You are not allowed to delete this project.");
    }
    await ctx.db.delete(args.projectId);

    // update user's project count
    await ctx.db.patch(user._id, {
      projectsUsed: Math.max(user.projectsUsed - 1, 0),
      lastActiveAt: Date.now(),
    });
    return { success: true };
  },
});
