import { Sparkles } from 'lucide-react'
import { formatShortDate } from '../../utils/formatters'

function AISuggestionPanel({ suggestion, onAccept, onIgnore, loading = false }) {
  if (!suggestion && !loading) return null

  return (
    <div className="overflow-hidden rounded-xl border border-warning/20 bg-gradient-to-br from-warning/20 via-orange-500/10 to-transparent p-4 backdrop-blur-sm">
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 w-32 shimmer rounded" />
          <div className="h-4 w-40 shimmer rounded" />
          <div className="h-3 w-full shimmer rounded" />
        </div>
      ) : (
        <>
          <div className="mb-3 space-y-1 text-sm text-text">
            <p>
              <span className="font-semibold">Effort:</span> {suggestion.estimatedEffort}
            </p>
            <p>
              <span className="font-semibold">Suggested Due:</span>{' '}
              {formatShortDate(suggestion.suggestedDueDate)}
            </p>
            <p className="text-text-secondary">
              <span className="font-semibold text-text">Reasoning:</span> {suggestion.reason}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onAccept}
              className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Accept
            </button>
            <button
              type="button"
              onClick={onIgnore}
              className="h-9 flex-1 rounded-lg border border-white/[0.1] bg-white/[0.05] text-sm font-semibold text-text-secondary transition-colors hover:bg-white/[0.08] hover:text-text"
            >
              Ignore
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default AISuggestionPanel
