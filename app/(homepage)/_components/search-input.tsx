'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export const SearchInput = () => {
  const [search, setSearch] = useState<string>();
  const router = useRouter();

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target?.value);
  };

  return (
    <Button variant="default" asChild>
      <Input
        className="rounded-full border-0 bg-slate-800 max-w-sm lg:max-w-lg md:max-w-sm sm:max-w-[250px]"
        placeholder="Search"
        type="search"
        value={search ?? ''}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            router.push(`/petposte?q=${search}`);
          }
        }}
        onChange={handleInputChange}
      ></Input>
    </Button>
  );
};
