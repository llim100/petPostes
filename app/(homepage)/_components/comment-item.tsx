'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, PenBox, ThumbsUp } from 'lucide-react';
import { Doc } from '@/convex/_generated/dataModel';
import { CommentWithAuthor } from '@/types';

interface CommentItemProps {
  comment: CommentWithAuthor;
}
export const CommentItem = ({ comment }: CommentItemProps) => {
  const timeAgo = formatDistanceToNow(comment._creationTime);
  return (
    <div className="space-y-6 p-4 rounded-xl relative flex">
      {true && (
        <div className="absolute top-14 right-2 cursor-pointer flex gap-x-2">
          <Trash2 onClick={() => {}} className="text-neutral-300" />
          <PenBox onClick={() => {}} className="text-neutral-300" />
        </div>
      )}
      <div className="w-11/12">
        <div className="flex items-center gap-0">
          <div className="flex items-center gap-1">
            <Avatar className="h-4 w-4">
              <AvatarImage src={comment.author.imageUrl} />
              <AvatarFallback>
                {comment.author.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold">Lorena</p>
          </div>

          <p className="text-neutral-400 text-xs ml-3">{timeAgo}</p>
          {/* <div className="flex items-center space-x-3 select-none ml-3">
            <ThumbsUp className="cursor-pointer" onClick={() => {}} size={20} />
            <p>200</p>
          </div> */}
        </div>

        <p
          className="h-fit overflow-auto bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 
                  duration-300 transform transition-transform  mx-5 p-3 text-white"
        >
          {comment.content}
        </p>
      </div>
    </div>
  );
};
