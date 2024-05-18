'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

import { Trash2, PenBox, ThumbsUp } from 'lucide-react';

const TestPage = () => {
  const now = new Date();
  const timeAgo = formatDistanceToNow(now);
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
            <Avatar>
              <AvatarImage src="next.svg" />
              <AvatarFallback>{'Lorena'.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="font-semibold">Lorena</p>
          </div>

          <p className="text-neutral-400 text-xs ml-3">{timeAgo}</p>
          <div className="flex items-center space-x-3 select-none ml-3">
            <ThumbsUp className="cursor-pointer" onClick={() => {}} size={20} />
            <p>200</p>
          </div>
        </div>

        <p className="h-fit overflow-auto bg-slate-200 rounded-md  mx-5 p-3">
          A very important message and comment A very important message and
          comment A very important message and comment A very important message
          and comment A very important message and comment A very important
          message and comment A very important message and comment A very
          important message and comment A very important message and comment A
          very important message and comment A very important message and
          comment A very important message and comment
        </p>
      </div>
    </div>
  );
};
export default TestPage;
