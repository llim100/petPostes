'use client';

import { Id } from '@/convex/_generated/dataModel';
import { Doc } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface CommentsProps {
  picture: Doc<'pictures'> & {
    pictureUrl: string;
    owner: Doc<'users'>;
    isOwner: boolean;
    favorite: boolean;
    likeCount: number;
  };
}
export const Comments = ({ picture }: CommentsProps) => {
  const comments = useQuery(api.comments.list, { pictureId: picture?._id });
  return (
    <div>
      <h1 className="text-xl font-bold">Comments</h1>
      {comments &&
        comments.map((comment) => <p key={comment._id}>{comment.content}</p>)}
    </div>
  );
};
