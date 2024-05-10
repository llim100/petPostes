import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const add = mutation({
  args: { pictureId: v.id('pictures'), content: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Called storeUser without authenticated user');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();

    if (user === null) {
      return;
    }

    const commentId = await ctx.db.insert('comments', {
      pictureId: args.pictureId,
      content: args.content,
      authorId: user._id,
    });

    return commentId;
  },
});

export const list = query({
  args: { pictureId: v.id('pictures') },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query('comments')
      .withIndex('by_pictureId', (q) => q.eq('pictureId', args.pictureId))
      .collect();

    const commentsWithAuthors = await Promise.all(
      comments.map(async (comment) => {
        const author = await ctx.db.get(comment.authorId);
        if (!author) {
          throw new Error('Author not found');
        }
        return {
          ...comment,
          author,
        };
      })
    );

    return commentsWithAuthors;
  },
});

export const remove = mutation({
  args: { id: v.id('comments') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
