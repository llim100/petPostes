'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

interface TrashDialogProps {
  id: Id<'pictures'>;
}

export const TrashDialog = ({ id }: TrashDialogProps) => {
  const mutate = useMutation(api.pictures.remove);
  const router = useRouter();

  const handleDelete = async () => {
    await mutate({ id: id });
    router.push('/');
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="transform transition hover:scale-125 active:scale-150 ml-10">
          <Trash2 size={30} className="text-white" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            picture.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
