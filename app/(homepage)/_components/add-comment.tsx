'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCirclePlus } from 'lucide-react';
import { useState } from 'react';
import { FileWithUrls } from '@/types';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Hint } from '@/components/hint';
interface EditTitleDialogProps {
  pictureId: Id<'pictures'>;
}

export const AddComment = ({ pictureId }: EditTitleDialogProps) => {
  const [comment, setComment] = useState('');
  const add = useMutation(api.comments.add);

  const handleAdd = async () => {
    if (comment === '') return;
    await add({ content: comment, pictureId: pictureId });
    setComment('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <button className="transform transition hover:scale-125 active:scale-150 ml-10">
            <Hint
              label="Add a comment"
              side="bottom"
              align="center"
              sideOffset={5}
            >
              <MessageCirclePlus size={30} className="text-white" />
            </Hint>
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a comment for this picture</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Comment
            </Label>
            <Input
              id="name"
              defaultValue=""
              className="col-span-3"
              placeholder="Add comment"
              // value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleAdd}
            onKeyDown={handleKeyDown}
            variant="secondary"
          >
            Add
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
