import { Doc } from '../convex/_generated/dataModel';

export type FileWithUrls = Doc<'pictures'> & {
  pictureUrl: string;
  owner: Doc<'users'>;
  isOwner: boolean;
  favorite: boolean;
  likeCount: number;
};
