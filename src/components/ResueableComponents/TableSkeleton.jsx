"use client";

import { Skeleton } from '@/components/ui/skeleton';

export default function TableSkeleton() {
  return (
    <div className="space-y-4 p-5">
      {/* Title and Filter Buttons Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-1/3" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      {/* Show Entries and Search Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-1/4" />
      </div>

      {/* Table Header Skeleton */}
      <div className="border rounded-lg bg-white">
        <div className="grid grid-cols-8 gap-4 p-4 bg-purple-100">
          {Array(8).fill().map((_, index) => (
            <Skeleton key={index} className="h-6 w-full" />
          ))}
        </div>
        {Array(5)
          .fill()
          .map((_, index) => (
            <div key={index} className="grid grid-cols-8 gap-4 p-4 border-t">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
      </div>
    </div>
  );
}