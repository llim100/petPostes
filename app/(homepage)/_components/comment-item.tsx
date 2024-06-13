'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, PenBox, ThumbsUp } from 'lucide-react';
import { Doc } from '@/convex/_generated/dataModel';
import { CommentWithAuthor } from '@/types';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { TrashCommentDialog } from './trash-comment-dialog';
import { Id } from '@/convex/_generated/dataModel';

interface CommentItemProps {
  id: Id<'comments'>;
  comment: CommentWithAuthor;
}
export const CommentItem = ({ id, comment }: CommentItemProps) => {
  const timeAgo = formatDistanceToNow(comment._creationTime);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const updateComment = useMutation(api.comments.updateComment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault()
    setContent(e.target.value);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleChangeTitle();
      setIsEditing(false);
    }
  };

  const handleChangeTitle = async () => {
    if (content === '') return;
    await updateComment({ content: content, id: id });
  };

  return (
    <div className="space-y-6 p-4 rounded-xl relative flex">
      {comment.isUserAuthor && (
        <div className="absolute top-14 right-2 cursor-pointer flex gap-x-2">
          <TrashCommentDialog id={id} />
          <PenBox
            onClick={() => {
              setIsEditing(true);
            }}
            className="text-neutral-300"
          />
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
        </div>
        {isEditing ? (
          <Input
            className="bg-slate-500 text-white pb-0"
            type="text"
            value={content}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <p
            className="h-fit overflow-auto bg-gray-800 rounded-lg shadow-md hover:bg-gray-700
                  duration-300 transform transition-transform  mx-5 p-3 text-white"
          >
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
};
