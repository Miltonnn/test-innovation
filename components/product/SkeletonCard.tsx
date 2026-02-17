"use client";

export function SkeletonCard() {
  return (
    <div className="rounded-lg shadow p-4 flex flex-col h-full gap-4 animate-pulse">
      <div className="bg-gray-300 rounded-md w-full h-48 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="mt-auto h-10 bg-gray-300 rounded w-full"></div>
    </div>
  );
}
