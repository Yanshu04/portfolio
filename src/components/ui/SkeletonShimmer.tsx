import React from "react";
import { motion } from "motion/react";

interface SkeletonBlockProps {
  className?: string;
  style?: React.CSSProperties;
}

export function SkeletonBlock({ className = "", style }: SkeletonBlockProps) {
  return (
    <div
      className={`skeleton-shimmer border border-neutral-800/40 light:border-neutral-300/40 ${className}`}
      style={style}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-[#16161A] light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 md:p-8 flex flex-col justify-between h-full shadow-bauhaus">
      <div>
        {/* Image skeleton */}
        <SkeletonBlock className="w-full aspect-video mb-6 border-2 border-neutral-800 light:border-black" />

        {/* Title skeleton */}
        <div className="flex justify-between items-center mb-4">
          <SkeletonBlock className="h-7 w-3/5" />
          <SkeletonBlock className="h-5 w-12" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-6">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-5/6" />
          <SkeletonBlock className="h-4 w-4/6" />
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          <SkeletonBlock className="h-6 w-16" />
          <SkeletonBlock className="h-6 w-20" />
          <SkeletonBlock className="h-6 w-14" />
        </div>
      </div>

      {/* Button footer skeleton */}
      <div className="pt-4 border-t border-neutral-800 light:border-neutral-200 flex justify-between">
        <SkeletonBlock className="h-5 w-28" />
        <SkeletonBlock className="h-5 w-28" />
      </div>
    </div>
  );
}

export function SectionSkeleton({ title }: { title?: string }) {
  return (
    <div className="py-24 md:py-32 px-[8%] md:px-[12%] lg:px-[14%] w-full border-t border-neutral-900 light:border-neutral-200">
      <div className="mb-12">
        <SkeletonBlock className="h-3 w-32 mb-3" />
        <SkeletonBlock className="h-10 w-64 mb-4" />
        <SkeletonBlock className="h-2 w-24" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </div>
  );
}

export function FullPageSkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[120] bg-[#0B0B0C] light:bg-[#FAF9F6] bg-grid-pattern overflow-y-auto px-[8%] md:px-[12%] lg:px-[14%] pt-24 pb-16 pointer-events-none"
    >
      {/* Header Bar Skeleton */}
      <div className="fixed top-0 left-0 w-full h-20 px-[8%] md:px-[12%] lg:px-[14%] flex items-center justify-between border-b-2 border-neutral-900 light:border-neutral-200 bg-[#0B0B0C] light:bg-[#FAF9F6] z-50">
        <SkeletonBlock className="h-6 w-44" />
        <div className="hidden md:flex items-center gap-8">
          <SkeletonBlock className="h-4 w-14" />
          <SkeletonBlock className="h-4 w-20" />
          <SkeletonBlock className="h-4 w-14" />
          <SkeletonBlock className="h-4 w-16" />
          <SkeletonBlock className="h-8 w-8" />
          <SkeletonBlock className="h-8 w-24" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="min-h-[70vh] flex flex-col justify-center space-y-8 max-w-3xl pt-12">
        <SkeletonBlock className="h-4 w-60" />
        <SkeletonBlock className="h-20 md:h-32 w-4/5" />
        <div className="border-l-4 border-[#E53E3E] pl-6 space-y-3">
          <SkeletonBlock className="h-5 w-full" />
          <SkeletonBlock className="h-5 w-5/6" />
        </div>
        <div className="flex flex-col sm:flex-row gap-6 pt-4">
          <SkeletonBlock className="h-14 w-48" />
          <SkeletonBlock className="h-14 w-48" />
        </div>
      </div>

      {/* Grid Showcase Skeleton */}
      <div className="mt-16 pt-16 border-t border-neutral-900 light:border-neutral-200">
        <div className="mb-12">
          <SkeletonBlock className="h-3 w-40 mb-3" />
          <SkeletonBlock className="h-9 w-52 mb-4" />
          <SkeletonBlock className="h-2 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </motion.div>
  );
}
