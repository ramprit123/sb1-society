import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Get the current authenticated user
export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), identity.subject))
      .first();

    return user;
  },
});

// Create or update user after Clerk authentication
export const createOrUpdateUser = mutation({
  args: {
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    profileImage: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Called storeUser without authentication present');
    }

    // Check if user already exists
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), identity.subject))
      .first();

    if (user) {
      // Update existing user
      return await ctx.db.patch(user._id, {
        email: args.email,
        name: args.firstName + ' ' + args.lastName,
        image: args.profileImage,
        updatedAt: Date.now(),
      });
    }

    // Create new user
    return await ctx.db.insert('users', {
      clerkId: identity.subject,
      email: args.email,
      name: args.firstName + '' + args.lastName,
      image: args.profileImage,
      stripeCustomerId: undefined,
      subscriptionStatus: 'inactive',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update user's Stripe customer ID
export const updateStripeCustomerId = mutation({
  args: { customerId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    return await ctx.db.patch(user._id, {
      stripeCustomerId: args.customerId,
    });
  },
});

// Update user's subscription status
export const updateSubscriptionStatus = mutation({
  args: {
    status: v.optional(
      v.union(
        v.literal('active'),
        v.literal('inactive'),
        v.literal('cancelled'),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    return await ctx.db.patch(user._id, {
      subscriptionStatus: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();
    return users;
  },
});
