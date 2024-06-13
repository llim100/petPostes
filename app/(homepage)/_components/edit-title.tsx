'use client';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Id } from '@/convex/_generated/dataModel';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface EditTitleProps {
  id: Id<'pictures'>;
  pictureTitle: string;
}

export const EditTitle = ({ id, pictureTitle }: EditTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(pictureTitle);
  const updateTitle = useMutation(api.pictures.updateTitle);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault()
    setTitle(e.target.value);
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
    if (title === '') return;
    await updateTitle({ title: title, id: id });
  };

  return (
    <div className="flex justify-start gap-1 items-center">
      <div>
        {isEditing ? (
          <Input
            className="bg-slate-500 text-white pb-0"
            type="text"
            value={title}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span onDoubleClick={handleDoubleClick}>{title}</span>
        )}
      </div>
      <div>
        {!isEditing && (
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <Pencil size={18} className="text-white" />
          </Button>
        )}
      </div>
    </div>
  );
};
