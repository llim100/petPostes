'use client';
import Image from 'next/image';
import Link from 'next/link';
import { SquareArrowRight, ThumbsUp, Heart } from 'lucide-react';
import { FileWithUrls } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Toggle } from '@/components/ui/toggle';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';

interface PictureCardProps {
  file: FileWithUrls;
}

export const PictureCard = ({ file }: PictureCardProps) => {
  const timeAgo = formatDistanceToNow(file._creationTime);
  const favorite = useMutation(api.pictures.favorite);
  const unfavorite = useMutation(api.pictures.unfavorite);
  const handleChange = () => {
    if (file.favorite) {
      unfavorite({ id: file._id });
    } else {
      favorite({ id: file._id });
    }
  };
  return (
    <div
      key={file._id}
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:bg-gray-700 
            duration-300 hover:scale-105 transform transition-transform  relative"
    >
      <div className="p-4">
        {file.pictureUrl && (
          <div className="group mb-4 rounded-md overflow-hidden">
            <Image
              src={file.pictureUrl}
              alt={file.title}
              className="w-full h-48 object-cover"
              width={200}
              height={200}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="bg-green-500 rounded-full p-2 transform 
                                    transition-transform duration-200 translate-y-full opacity-0 
                                    group-hover:opacity-100 group-hover:translate-y-6
                                    "
              >
                <Link href={`/${file._id}`}>
                  <SquareArrowRight className="text-white h-6 w-6" />
                </Link>
              </div>
            </div>
            <Toggle
              size="sm"
              onPressedChange={handleChange}
              className="absolute top-2 left-2"
            >
              <Heart
                className={cn(
                  'h-4 w-4 text-black',
                  file.favorite && 'fill-red-800 text-red'
                )}
              />
            </Toggle>
          </div>
        )}
        <div className="flex  justify-between text-sm md:text-xs">
          <div className="flex flex-column md:flex-row justify-start gap-1 align-bottom">
            <p className="text-muted text-sm">
              posted by{' '}
              <span className="text-muted-foreground">
                {file.owner.fullName}
              </span>
              <p>{timeAgo} ago</p>
            </p>
          </div>
          <div className="flex flex-col">
            <ThumbsUp className="p-1 h-6 w-6" />
            <p className=" text-muted-foreground text-xs">{file.likeCount} </p>
          </div>

          {/* <Toggle variant="outline" size="sm" onPressedChange={handleChange}>
            <Heart />
          </Toggle> */}
        </div>
      </div>
    </div>
  );
};
