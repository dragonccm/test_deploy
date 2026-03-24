"use client";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loadings() {
    return (
        <main className="text-center flex flex-col justify-center w-full h-full leading-10 gap-6 p-8">
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                {/* Header skeleton */}
                <div className="flex flex-col gap-4">
                    <Skeleton 
                        count={1} 
                        className="mx-auto rounded-full" 
                        width={80} 
                        height={80}
                        containerClassName="animate-pulse"
                    />
                    <Skeleton 
                        count={1} 
                        className="mx-auto rounded-md" 
                        width={200} 
                        height={24}
                    />
                    <Skeleton 
                        count={1} 
                        className="mx-auto rounded-md" 
                        width={150} 
                        height={16}
                    />
                </div>

                {/* Content cards skeleton */}
                <div className="flex flex-col gap-4 mt-8">
                    {[1, 2, 3].map((i) => (
                        <div 
                            key={i} 
                            className="bg-dark-2 rounded-lg p-4 flex gap-4 animate-pulse"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <Skeleton 
                                count={1} 
                                className="rounded-full flex-shrink-0" 
                                width={48} 
                                height={48}
                            />
                            <div className="flex-1 flex flex-col gap-2">
                                <Skeleton count={1} className="rounded-md" height={16} />
                                <Skeleton count={1} className="rounded-md" height={14} width="80%" />
                                <Skeleton count={1} className="rounded-md" height={14} width="60%" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom action buttons skeleton */}
                <div className="flex justify-center gap-3 mt-6">
                    <Skeleton 
                        count={1} 
                        className="rounded-lg" 
                        width={100} 
                        height={36}
                    />
                    <Skeleton 
                        count={1} 
                        className="rounded-lg" 
                        width={100} 
                        height={36}
                    />
                </div>
            </SkeletonTheme>

            {/* Custom loading spinner */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-dark-3 border-t-primary-500 rounded-full animate-spin"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
            </div>
        </main>
    );
}