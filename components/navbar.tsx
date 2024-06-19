'use client';
import { UserButton } from '@clerk/clerk-react';
import Link from 'next/link';
import { UploadPictureModal } from '@/app/(homepage)/_components/upload-picture-modal';
import { HeartPulse, SearchIcon } from 'lucide-react';
import { Hint } from './hint';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, ChangeEvent } from 'react';

//import { SearchInput } from '@/app/(homepage)/_components/search-input';

export const Navbar = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <nav className="bg-slate-950 py-4">
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex justify-items-start gap-0">
          <Link
            href="/petposte"
            className="flex gap-1 items-center relative flex-shrink-0"
          >
            <div className="text-white tracking-tighter font-bold text-xl">
              4E
            </div>
            <HeartPulse className="text-white h-6 w-6" />
            <span className="text-white tracking-tighter font-bold text-xl">
              petPoste
            </span>
          </Link>

          {/* <Link
            href="/petposte/test"
            className="text-white ml-10 font-bold text-xl pl-1"
          >
            test
          </Link> */}
        </div>

        <div className="flex items-center pr-8 gap-2">
          {/* <SearchInput />
          <SearchIcon className="h-[2.5rem] w-[2.5rem] text-white -ml-11" /> */}
          <UploadPictureModal />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
