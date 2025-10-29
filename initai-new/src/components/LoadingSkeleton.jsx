import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white/10 rounded-3xl overflow-hidden">
            {/* Image skeleton */}
            <div className="h-[80%] bg-gradient-to-r from-gray-300/20 via-gray-400/20 to-gray-300/20 animate-shimmer" />
            
            {/* Content skeleton */}
            <div className="h-[20%] p-6 space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-300/20 via-gray-400/20 to-gray-300/20 rounded animate-shimmer" />
              <div className="h-3 bg-gradient-to-r from-gray-300/20 via-gray-400/20 to-gray-300/20 rounded w-3/4 animate-shimmer" />
              <div className="flex items-center justify-between">
                <div className="h-3 bg-gradient-to-r from-gray-300/20 via-gray-400/20 to-gray-300/20 rounded w-1/3 animate-shimmer" />
                <div className="h-3 bg-gradient-to-r from-gray-300/20 via-gray-400/20 to-gray-300/20 rounded w-1/4 animate-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
