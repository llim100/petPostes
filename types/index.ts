import { Doc } from '../convex/_generated/dataModel';

export type FileWithUrls = Doc<'pictures'> & {
  pictureUrl: string;
  owner: Doc<'users'>;
  isOwner: boolean;
  favorite: boolean;
  likeCount: number;
};

export type CommentWithAuthor = Doc<'comments'> & { author: Doc<'users'> };
export type CommentsWithAuthor = Array<CommentWithAuthor>;
