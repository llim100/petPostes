import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { CommentWithAuthor, CommentsWithAuthor } from '../types';
import { UserIdentity } from 'convex/server';
import { withUser } from './helpers';
import { ConvexError } from 'convex/values';
import { getOneFrom } from 'convex-helpers/server/relationships';

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
      .order('desc')
      .collect();

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError('Unauthorized');

    const user = await getOneFrom(
      ctx.db,
      'users',
      'by_token',
      identity.tokenIdentifier,
      'tokenIdentifier'
    );
    if (user === null) {
      throw new ConvexError("User doesn't exist in the database");
    }

    const commentsWithAuthors = await Promise.all(
      comments.map(async (comment) => {
        const author = await ctx.db.get(comment.authorId);
        if (!author) {
          throw new Error('Author not found');
        }

        const isUserAuthor = user._id === comment.authorId;

        return {
          ...comment,
          author,
          isUserAuthor,
        };
      })
    );

    return commentsWithAuthors as CommentsWithAuthor;
  },
});

export const updateComment = mutation({
  args: { id: v.id('comments'), content: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const content = args.content.trim();

    if (!content) {
      throw new Error('Content is required');
    }

    if (content.length > 100) {
      throw new Error('Title is too long!');
    }

    const comment = await ctx.db.patch(args.id, {
      content: args.content,
    });

    return comment;
  },
});

export const remove = mutation({
  args: { id: v.id('comments') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
