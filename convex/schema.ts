import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    fullName: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
  }).index('by_token', ['tokenIdentifier']),
  pictures: defineTable({
    title: v.string(),
    category: v.optional(v.string()),
    picStorageId: v.id('_storage'),
    ownerId: v.id('users'),
  })
    .index('by_ownerId', ['ownerId'])
    .index('by_category', ['category'])
    .searchIndex('search_title', {
      searchField: 'title',
      filterFields: ['category'],
    }),
  comments: defineTable({
    pictureId: v.id('pictures'),
    content: v.string(),
    authorId: v.id('users'),
    isUserAuthor: v.optional(v.boolean()),
  }).index('by_pictureId', ['pictureId']),
  likes: defineTable({
    pictureId: v.id('pictures'),
    userId: v.id('users'),
  })
    .index('by_pictureId', ['pictureId'])
    .index('by_pictureId_userId', ['pictureId', 'userId']),

  userFavorites: defineTable({
    userId: v.id('users'),
    pictureId: v.id('pictures'),
  })
    .index('by_pictureId', ['pictureId'])
    .index('by_userId_pictureId', ['userId', 'pictureId'])
    .index('by_userId', ['userId']),
});
