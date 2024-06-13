'use client';

import { Id } from '@/convex/_generated/dataModel';
import { Doc } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CommentItem } from './comment-item';
import { CommentsWithAuthor } from '@/types';

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
  const comments = useQuery(api.comments.list, {
    pictureId: picture?._id,
  }) as CommentsWithAuthor;
  //comments with owner,
  return (
    <ScrollArea className="h-36 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Comments</h4>
        {comments?.map((comment) => (
          <CommentItem key={comment._id} comment={comment} id={comment._id} />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

{
  /* <div>
<h1 className="text-xl font-bold">Comments</h1>
{comments &&
  comments.map((comment) => <p key={comment._id}>{comment.content}</p>)}
</div> */
}
