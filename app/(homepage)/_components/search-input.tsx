'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchInputProps {
  defaultValue: string;
}

export const SearchInput = ({ defaultValue = '' }: SearchInputProps) => {
  const [search, setSearch] = useState<string>(defaultValue);
  const router = useRouter();

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target?.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault;

      router.push(`/petposte?q=${search}`);
      setSearch('');
    }
  };

  return (
    <Button variant="default" asChild>
      <Input
        className="rounded-full border-0 bg-slate-800 max-w-sm lg:max-w-xlg md:max-w-md sm:max-w-[300px]"
        placeholder="Search"
        type="search"
        value={search}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      ></Input>
    </Button>
  );
};
