'use client';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import {
  ArrowBigLeft,
  CircleChevronUp,
  Heart,
  MessageCirclePlus,
  Pencil,
  ThumbsUp,
  Trash2,
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from 'next/link';
import { Hint } from '@/components/hint';
import { cn } from '@/lib/utils';
import { favorite } from '@/convex/pictures';
import { TrashDialog } from '../_components/trash-dialog';
import { EditTitleDialog } from '../_components/edit-title-dialog';
import { EditTitle } from '../_components/edit-title';
//import {Comments} from '../_components/comments';
import { Comments } from '../_components/comments';

import { FileWithUrls } from '@/types';
import { AddComment } from '../_components/add-comment';
import { useRouter } from 'next/navigation';

type EditPostProps = {
  params: { postID: Id<'pictures'> };
};

const EditPost = ({ params }: EditPostProps) => {
  const id = params?.postID;
  const picture = useQuery(
    api.pictures.get,
    id ? { picId: id } : 'skip'
  ) as FileWithUrls;

  const isFavorite = useQuery(api.pictures.getFavorite, { id });
  const favorite = useMutation(api.pictures.favorite);
  const unfavorite = useMutation(api.pictures.unfavorite);
  const isLiked = useQuery(api.pictures.getLike, { id });
  const like = useMutation(api.pictures.like);
  const router = useRouter();

  const handleFavorite = () => {
    if (isFavorite) {
      unfavorite({ id });
    } else {
      favorite({ id });
    }
  };

  const handleLike = () => {
    like({ id });
  };

  if (picture === undefined) {
    return <div>Loading ...</div>;
  }

  if (picture === null) {
    router.push('/');
  }

  return (
    <div className="min-h-min bg-gradient-to-br from-slate-900 to-slate-900 text-white">
      <div className="max-w mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="flex w-full justify-between px-8">
            <h1 className="text-4xl font-bold mb-8">Edit this post</h1>

            <Link href="/petposte" className="pr-10">
              <Hint
                label="back to main screen"
                side="top"
                align="center"
                sideOffset={5}
              >
                <ArrowBigLeft className="text-white h-10 w-10" />
              </Hint>
            </Link>
          </div>
          <div
            className="h-3/6 min-w-fit bg-gray-800 rounded-lg shadow-md overflow-hidden hover:bg-gray-700 
                  duration-300 transform transition-transform p-20"
          >
            <AspectRatio ratio={1 / 1}>
              <Image
                src={picture?.pictureUrl!}
                alt="pet picture"
                objectFit="contain"
                fill
              />
            </AspectRatio>
          </div>
          <div>
            <div className="flex items-center justify-between p-4">
              <div className="flex justify-start gap-x-0">
                {/* <h1 className="font-bold text-xl">{picture?.title}</h1> */}
                {picture?.isOwner && (
                  <EditTitle id={id} pictureTitle={picture.title} />
                )}
              </div>
              <div className="flex flex-row justify-end">
                <AddComment pictureId={id} />
                <div>
                  <button
                    onClick={handleLike}
                    className="transform transition hover:scale-125 active:scale-150 ml-10"
                  >
                    <ThumbsUp
                      size={30}
                      className={cn('text-white', isLiked && 'fill-red-600')}
                    />
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleFavorite}
                    className="transform transition hover:scale-125 active:scale-150 ml-10"
                  >
                    <Hint
                      label="Add to Favorites"
                      side="bottom"
                      align="center"
                      sideOffset={5}
                    >
                      <Heart
                        size={30}
                        className={cn(
                          'text-white',
                          isFavorite && 'fill-red-600'
                        )}
                      />
                    </Hint>
                  </button>
                </div>
                {picture?.isOwner && (
                  <div>
                    <TrashDialog id={id} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Comments picture={picture} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
