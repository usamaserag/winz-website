import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-3xl p-6 shadow-sm animate-pulse">
      <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3"></div>
      <div className="space-y-2 mb-5">
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
      </div>
      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
