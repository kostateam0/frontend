// components/feed/FeedItemSkeleton.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeedItemSkeleton() {
  return (
    <div className="w-full space-y-4">
      <Card className="border border-gray-200 bg-white dark:border-[#1a1a1a] dark:bg-[#1a1a1a]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full bg-stone-500"/>
            <div>
              <Skeleton className="h-4 w-32 mb-1 bg-stone-500" />
              <Skeleton className="h-3 w-24 bg-stone-500"  />
            </div>
          </div>
          <Skeleton className="h-6 w-6 rounded bg-stone-500" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2 bg-stone-500" />
          <Skeleton className="h-4 w-5/6 mb-2 bg-stone-500" />
          <Skeleton className="h-4 w-2/3 bg-stone-500" />
        </CardContent>
        <CardFooter className="flex items-center space-x-4">
          <Skeleton className="h-5 w-12 rounded bg-stone-500" />
          <Skeleton className="h-5 w-12 rounded bg-stone-500" />
          <Skeleton className="h-5 w-12 rounded bg-stone-500" />
        </CardFooter>
      </Card>
    </div>
  );
}
