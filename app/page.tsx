import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-transparent relative backdrop:saturate-300">
      <div className="relative isolate -z-10 min-h-fit w-full">
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
            src="/logo.ico"
            width={200}
            height={200}
            alt="file drive logo"
            className="inline-block mb-8"
          />

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Upload and share your pet pictures{' '}
          </h1>
          <br></br>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            with your co-workers
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Sign-in and start connecting with everyone.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/petposte"
              className="rounded-md bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
