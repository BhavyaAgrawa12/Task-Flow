import { Plus } from 'lucide-react'

function CreateBoardCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-card group flex min-h-[200px] flex-col items-center justify-center gap-3 border-dashed p-6 text-center transition-all hover:border-primary/40 hover:bg-white/[0.07] active:scale-[0.99]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.05] text-text-secondary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
        <Plus className="h-6 w-6" />
      </span>
      <span className="text-sm font-semibold text-text-secondary transition-colors group-hover:text-text">
        Create New Board
      </span>
    </button>
  )
}

export default CreateBoardCard
