'use client';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery, usePaginatedQuery } from 'convex/react';
import { useEffect, useState } from 'react';
import { Heart, SquareArrowRight, ThumbsUp, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { PictureCard } from '../../_components/pictureCard';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { SearchInput } from '@/app/(homepage)/_components/search-input';

interface HomePageProps {
  searchParams: {
    q?: string;
  };
}

const SearchHome = ({ searchParams: { q = '' } }: HomePageProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');
  const store = useMutation(api.users.store);
  //const pictureList = useQuery(api.pictures.list);
  const {
    results: list,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.pictures.search,
    { search: q as string },
    { initialNumItems: 2 }
  );

  const [showFavorites, setShowFavorites] = useState(false);
  const router = useRouter();

  useEffect(() => {
    store({});
  }, [store]);

  if (list === undefined) {
    return <div>Loading ...</div>;
  }

  if (list === null) {
    router.push('/');
  }

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  // const filteredPictureList = showFavorites
  //   ? pictureList?.filter((file) => file.favorite)
  //   : pictureList;

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 to-slate-900 text-white">
      <div className="max-w mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full justify-between px-8 pb-6">
          <h1 className="text-4xl font-bold mb-2">Pet Pictures</h1>
          <div className="flex items-center">
            <SearchInput defaultValue="" />
            <SearchIcon className="h-[2.5rem] w-[2.5rem] text-white -ml-11" />
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list?.map((file) => <PictureCard key={file._id} file={file} />)}
        </div>
      </div>
      <div className="footer flex m-auto justify-center">
        <Button
          className={cn('text-white', status !== 'CanLoadMore' && 'invisible')}
          onClick={() => {
            loadMore(2);
          }}
          disabled={status !== 'CanLoadMore'}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default SearchHome;
