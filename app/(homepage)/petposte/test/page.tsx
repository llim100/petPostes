//'use client';
//import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
//import { useQuery } from 'convex/react';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';
//const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const TestPage = async () => {
  const { userId } = auth();
  const pics = await fetchQuery(api.pictures.list);
  return <div className="text-white">{pics.length}</div>;
};

export default TestPage;
