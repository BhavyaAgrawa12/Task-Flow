export function SkeletonBar({ className = '' }) {
  return <div className={`shimmer rounded-lg bg-white/[0.06] ${className}`} />
}

export function PageHeaderSkeleton() {
  return (
    <div className="mb-5 space-y-2 sm:mb-6">
      <SkeletonBar className="h-7 w-40" />
      <SkeletonBar className="h-4 w-64 max-w-full" />
    </div>
  )
}

export function ChartGridSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-5">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="glass-card min-h-[240px] p-5 sm:min-h-[280px]">
          <SkeletonBar className="mb-4 h-4 w-32" />
          <SkeletonBar className="h-[180px] w-full rounded-xl" />
        </div>
      ))}
    </div>
  )
}

export function BoardGridSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="glass-card min-h-[200px] p-5">
          <SkeletonBar className="mb-4 h-4 w-3/5" />
          <SkeletonBar className="mb-6 h-8 w-24 rounded-full" />
          <SkeletonBar className="mb-2 h-3 w-20" />
          <SkeletonBar className="h-1.5 w-full rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function KanbanSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden pb-2">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="min-w-[240px] flex-1 sm:min-w-[280px]">
          <SkeletonBar className="mb-3 h-4 w-24" />
          <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3">
            <SkeletonBar className="h-24 w-full rounded-xl" />
            <SkeletonBar className="h-24 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="space-y-4 border-b border-white/[0.08] p-6 sm:p-8 md:border-b-0 md:border-r">
          <SkeletonBar className="mx-auto h-20 w-20 rounded-full md:mx-0" />
          <SkeletonBar className="mx-auto h-5 w-40 md:mx-0" />
          <SkeletonBar className="mx-auto h-4 w-52 md:mx-0" />
          <div className="space-y-3 pt-4">
            {Array.from({ length: 3 }, (_, index) => (
              <SkeletonBar key={index} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        </div>
        <div className="space-y-4 p-6 sm:p-8">
          <SkeletonBar className="h-5 w-24" />
          <SkeletonBar className="h-10 w-48 rounded-xl" />
          <SkeletonBar className="h-11 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
