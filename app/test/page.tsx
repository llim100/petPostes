'use client';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';

const Test = () => {
  const petList = useQuery(api.pictures.list);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {petList &&
        petList.map((pet) => (
          <div key={pet._id} className="group mb-4 rounded-md overflow-hidden">
            <Image
              src={pet.pictureUrl}
              alt={pet.title}
              className="w-full h-48 object-cover"
              width={200}
              height={200}
            />
            <h1>{pet.pictureUrl}</h1>
          </div>
        ))}
    </div>
  );
};

export default Test;
