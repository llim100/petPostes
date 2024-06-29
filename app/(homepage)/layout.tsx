import { Navbar } from '@/components/navbar';
import { Spinner } from '@/components/spinner';
// import { useConvexAuth } from "convex/react";
// import { redirect } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <main className="flex h-5/6">
        <div className="h-full w-full">{children}</div>
      </main>
    </div>
  );
}
