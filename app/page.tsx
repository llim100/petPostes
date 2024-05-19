'use client';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-transparent">
      <div className="relative  -z-10 min-h-fit w-full">
        <div className="absolute inset-x-0 w-full h-screen overflow-clip opacity-70 blur-md">
          <Image
            src="doggie3.png"
            className="w-full object-cover"
            fill
            alt=""
          />
        </div>
      </div>
      <div className="mx-auto pt-36 w-full py-8 min-h-fit">
        <div className="text-center">
          <Image
            src="/logo.svg"
            width={200}
            height={200}
            alt="pet logo"
            className="inline mb-8"
          />
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl w-2/3 ">
              Upload and share your pet pictures with your co-workers
            </h1>
          </div>

          <p className="mt-6 text-lg leading-8 text-slate-900">
            Sign-in and start connecting with everyone.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/petposte"
              className="rounded-md bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
