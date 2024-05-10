import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { FileWithUrls } from '../types/index';

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError('Unauthorized');

    const pictures = await ctx.db.query('pictures').collect();

    return Promise.all(
      pictures.map(async (picture) => {
        const pictureUrl = await ctx.storage.getUrl(picture.picStorageId);
        let imageUrl: string | null = null;

        const user = await ctx.db
          .query('users')
          .withIndex('by_token', (q) =>
            q.eq('tokenIdentifier', identity.tokenIdentifier)
          )
          .unique();

        if (user === null) {
          throw new ConvexError("User doesn't exist in the database");
        }

        const favorite = await ctx.db
          .query('userFavorites')
          .withIndex('by_userId_pictureId', (q) =>
            q.eq('userId', user._id).eq('pictureId', picture._id)
          )
          .unique();

        const owner = await ctx.db.get(picture.ownerId);
        const isOwner = user._id === picture.ownerId;

        const likes = await ctx.db
          .query('likes')
          .withIndex('by_pictureId', (q) => q.eq('pictureId', picture._id))
          .collect();
        const likeCount = likes.length;

        return {
          ...picture,
          pictureUrl,
          owner,
          isOwner,
          favorite: favorite ? true : false,
          likeCount,
        } as FileWithUrls;
      })
    );
  },
});

export const get = query({
  args: { picId: v.id('pictures') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError('Unauthorized');

    const file = await ctx.db.get(args.picId);
    if (!file) return null;

    const pictureUrl = await ctx.storage.getUrl(file.picStorageId);
    // let imageUrl: string | null = null;

    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();

    if (user === null) {
      throw new ConvexError("User doesn't exist in the database");
    }

    const favorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_userId_pictureId', (q) =>
        q.eq('userId', user._id).eq('pictureId', file._id)
      )
      .unique();

    //const owner = await ctx.db.get(file.ownerId);
    const owner = await ctx.db.get(file.ownerId);
    const isOwner = user._id === file.ownerId;

    return {
      ...file,
      pictureUrl,
      owner,
      isOwner,
      favorite: favorite ? true : false,
    } as FileWithUrls;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const savePictureStorageId = mutation({
  args: {
    picStorageId: v.id('_storage'),
    title: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError('Unauthorized');

    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError('User not found.');
    }

    return await ctx.db.insert('pictures', {
      picStorageId: args.picStorageId,
      ownerId: user._id,
      title: args.title,
      category: args.category,
    });
  },
});

export const getFavorite = query({
  args: { id: v.id('pictures') },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error('User not found');
    }

    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_userId_pictureId', (q) =>
        q.eq('userId', user._id).eq('pictureId', id)
      )
      .unique();

    return !!existingFavorite;
  },
});

export const favorite = mutation({
  args: { id: v.id('pictures') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const picture = await ctx.db.get(args.id);

    if (!picture) {
      throw new Error('File not found');
    }

    const userId = picture.ownerId;

    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_userId_pictureId', (q) =>
        q.eq('userId', userId).eq('pictureId', picture._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error('File already favorited');
    }

    await ctx.db.insert('userFavorites', {
      userId,
      pictureId: picture._id,
    });

    return picture;
  },
});

export const unfavorite = mutation({
  args: { id: v.id('pictures') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const picture = await ctx.db.get(args.id);

    if (!picture) {
      throw new Error('File not found');
    }

    const userId = picture.ownerId;

    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_userId_pictureId', (q) =>
        q.eq('userId', userId).eq('pictureId', picture._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error('Favorited file not found');
    }

    await ctx.db.delete(existingFavorite._id);

    return picture;
  },
});

export const remove = mutation({
  args: { id: v.id('pictures') },
  handler: async (ctx, { id }) => {
    //delete comments with this picture
    const comments = await ctx.db
      .query('comments')
      .withIndex('by_pictureId', (q) => q.eq('pictureId', id))
      .collect();
    await Promise.all(
      comments.map(async (comment) => {
        await ctx.db.delete(comment._id);
      })
    );
    //delete likes with this picture
    const likes = await ctx.db
      .query('likes')
      .withIndex('by_pictureId', (q) => q.eq('pictureId', id))
      .collect();
    await Promise.all(
      likes.map(async (like) => {
        await ctx.db.delete(like._id);
      })
    );
    //delete userFavorites
    const userFaves = await ctx.db
      .query('userFavorites')
      .withIndex('by_pictureId', (q) => q.eq('pictureId', id))
      .collect();
    await Promise.all(
      userFaves.map(async (userFave) => {
        await ctx.db.delete(userFave._id);
      })
    );
    //delete this picture
    await ctx.db.delete(id);
  },
});

export const getLike = query({
  args: { id: v.id('pictures') },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error('User not found');
    }

    const existingLike = await ctx.db
      .query('likes')
      .withIndex('by_pictureId_userId', (q) =>
        q.eq('pictureId', id).eq('userId', user._id)
      )
      .unique();

    return !!existingLike;
  },
});

export const like = mutation({
  args: { id: v.id('pictures') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
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

    const picture = await ctx.db.get(args.id);

    if (!picture) {
      throw new Error('File not found');
    }

    const liked = await ctx.db
      .query('likes')
      .withIndex('by_pictureId_userId', (q) =>
        q.eq('pictureId', picture._id).eq('userId', user._id)
      )
      .unique();

    if (liked) {
      await ctx.db.delete(liked._id);
    } else {
      await ctx.db.insert('likes', {
        pictureId: args.id,
        userId: user._id,
      });
    }
  },
});

export const updateTitle = mutation({
  args: { id: v.id('pictures'), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const title = args.title.trim();

    if (!title) {
      throw new Error('Content is required');
    }

    if (title.length > 100) {
      throw new Error('Title is too long!');
    }

    const picture = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return picture;
  },
});
