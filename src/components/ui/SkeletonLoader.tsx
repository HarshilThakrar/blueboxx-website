import React from 'react';
import { motion } from 'framer-motion';

export function SkeletonLoader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-slate-50 z-[100] flex"
    >
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex w-64 bg-[#0d1635] border-r border-white/10 flex-col">
        <div className="h-20 border-b border-white/10 flex items-center px-6">
          <div className="w-32 h-8 bg-white/10 rounded-md animate-pulse"></div>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-full h-10 bg-white/5 rounded-xl animate-pulse delay-75"></div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Skeleton */}
        <div className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="w-64 h-10 bg-slate-100 rounded-xl animate-pulse"></div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse delay-100"></div>
            <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>

        {/* Dashboard Content Skeleton */}
        <div className="p-8 flex-1">
          {/* Header Texts */}
          <div className="w-48 h-8 bg-slate-200 rounded-md mb-2 animate-pulse"></div>
          <div className="w-96 h-4 bg-slate-100 rounded-md mb-8 animate-pulse delay-75"></div>

          {/* Stat Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-28 bg-white rounded-2xl border border-slate-200 p-6 flex gap-4 shadow-sm animate-pulse">
                <div className="w-14 h-14 bg-slate-100 rounded-full"></div>
                <div className="flex-1 space-y-2 py-2">
                  <div className="w-20 h-3 bg-slate-100 rounded"></div>
                  <div className="w-full h-6 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Columns Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[400px] bg-white rounded-2xl border border-slate-200 animate-pulse delay-150 p-6 space-y-4">
               <div className="w-48 h-6 bg-slate-200 rounded mb-8"></div>
               {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-full h-16 bg-slate-100 rounded-xl"></div>
               ))}
            </div>
            <div className="lg:col-span-1 h-[400px] bg-white rounded-2xl border border-slate-200 animate-pulse delay-200 p-6 space-y-4">
               <div className="w-32 h-6 bg-slate-200 rounded mb-8"></div>
               {[1, 2, 3].map(i => (
                  <div key={i} className="w-full h-20 bg-slate-100 rounded-xl"></div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
