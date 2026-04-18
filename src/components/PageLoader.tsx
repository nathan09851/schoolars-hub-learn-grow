import { Skeleton } from '@/components/ui/skeleton';

const PageLoader = () => (
  <div className="min-h-screen flex flex-col">
    <div className="h-16 border-b border-border bg-card" />
    <main className="flex-1 container px-4 py-20 space-y-8">
      <Skeleton className="h-12 w-2/3 mx-auto" />
      <Skeleton className="h-6 w-1/2 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </main>
  </div>
);

export default PageLoader;
