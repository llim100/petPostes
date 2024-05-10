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
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { FileWithUrls } from '@/types';
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Hint } from '@/components/hint';
interface EditTitleDialogProps {
  picture: Doc<'pictures'> & {
    pictureUrl: string;
    owner: Doc<'users'>;
    isOwner: boolean;
    favorite: boolean;
    likeCount: number;
  };
}

export const EditTitleDialog = ({ picture }: EditTitleDialogProps) => {
  const [title, setTitle] = useState('');
  const updateTitle = useMutation(api.pictures.updateTitle);

  const handleChangeTitle = async () => {
    if (title === '') return;
    await updateTitle({ title: title, id: picture._id });
    setTitle('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleChangeTitle();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <button className="transform transition hover:scale-125 active:scale-150 ml-10">
            <Hint label="Edit title" side="top" align="center" sideOffset={5}>
              <Pencil size={20} className="text-white" />
            </Hint>
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit the title of this pet picture</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              defaultValue=""
              className="col-span-3"
              placeholder={picture.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleChangeTitle}
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
