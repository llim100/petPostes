import { Doc } from './_generated/dataModel';
import { QueryCtx } from './_generated/server';

/**
 * Wrapper for a Convex query or mutation function that provides a user in ctx.
 *
 * Throws an exception if there isn't a user logged in.
 * Pass this to `query`, `mutation`, or another wrapper. E.g.:
 * export default mutation({
 *   handler: withUser(async ({ db, auth, user }, {args}) => {...})
 * });
 * @param func - Your function that can now take in a `user` in the first param.
 * @returns A function to be passed to `query` or `mutation`.
 */
export const withUser = <Ctx extends QueryCtx, Args extends [any] | [], Output>(
  func: (ctx: Ctx & { user: Doc<'users'> }, ...args: Args) => Promise<Output>
): ((ctx: Ctx, ...args: Args) => Promise<Output>) => {
  return async (ctx: Ctx, ...args: Args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error(
        'Unauthenticated call to function requiring authentication'
      );
    }
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();
    if (!user) throw new Error('User not found');
    return func({ ...ctx, user }, ...args);
  };
};
