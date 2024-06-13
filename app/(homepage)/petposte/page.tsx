'use client';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useEffect, useState } from 'react';
import { Heart, SquareArrowRight, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { PictureCard } from '../_components/pictureCard';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface HomePageProps {
  searchParams: {
    q?: string;
  };
}

const Home = ({ searchParams: { q } }: HomePageProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');
  const store = useMutation(api.users.store);
  const pictureList = useQuery(api.pictures.list);
  const testList = useQuery(api.pictures.search, { search: q as string });

  const [showFavorites, setShowFavorites] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    store({});
  }, [store]);

  if (pictureList === undefined) {
    return <div>Loading ...</div>;
  }

  if (pictureList === null) {
    router.push('/');
  }

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  if (pictureList === undefined) {
    return <div>Loading...</div>;
  }

  const filteredPictureList = showFavorites
    ? pictureList?.filter((file) => file.favorite)
    : pictureList;

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 to-slate-900 text-white">
      <div className="max-w mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full justify-between px-8">
          <h1 className="text-4xl font-bold mb-2">Pet Pictures</h1>

          <button
            onClick={toggleShowFavorites}
            className="transform transition hover:scale-125 active:scale-150 ml-10"
          >
            <Hint
              label="Show Favorite Pictures"
              side="top"
              align="center"
              sideOffset={5}
            >
              <Heart
                size={30}
                className={cn('text-white', showFavorites && 'fill-red-600')}
              />
            </Hint>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPictureList?.map((file) => (
            <PictureCard key={file._id} file={file} />
          ))}
        </div>
      </div>
      <h1>{q}</h1>
      <p>--------</p>
      <h1>{JSON.stringify(testList)}</h1>
    </div>
  );
};

export default Home;
