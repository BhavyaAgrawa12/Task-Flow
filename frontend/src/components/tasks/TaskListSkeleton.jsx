function TaskListSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="glass-card flex items-center gap-4 p-4"
        >
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-2/5 shimmer rounded-lg" />
            <div className="h-3 w-1/3 shimmer rounded-lg" />
          </div>
          <div className="h-6 w-16 shimmer rounded-md" />
        </div>
      ))}
    </div>
  )
}

export default TaskListSkeleton
