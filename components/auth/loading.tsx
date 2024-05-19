import Image from 'next/image';
import { Spinner } from '../spinner';

export const Loading = () => {
  return (
    <main className="w-full bg-white grid h-screen place-items-center">
      <Spinner size="icon" />
    </main>
  );
};
