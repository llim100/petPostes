'use client';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useSearchParams } from 'next/navigation';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');

  return (
    <div>
      <h1>results</h1>
      {search}
    </div>
  );
};

export default ResultsPage;
