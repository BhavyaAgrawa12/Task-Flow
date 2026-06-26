function EmptyState({ title, description, action, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center sm:py-12">
      {Icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-text-muted">
          <Icon className="h-5 w-5" />
        </div>
      ) : null}
      <p className="text-sm font-medium text-text">{title}</p>
      {description ? (
        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-text-muted sm:text-sm">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

export default EmptyState
