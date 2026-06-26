import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ExternalLink, MoreVertical, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import AvatarGroup from './AvatarGroup'
import ConfirmDialog from '../common/ConfirmDialog'
import { getApiErrorMessage } from '../../utils/apiErrors'

function BoardCard({ board, members, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete(board.id)
      setConfirmOpen(false)
      toast.success('Board deleted')
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to delete board'))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="glass-card group relative flex min-h-[200px] flex-col p-5 transition-all hover:border-white/[0.14] hover-lift">
        <div className="mb-4 flex items-start justify-between gap-3">
          <Link
            to={`/boards/${board.id}`}
            className="line-clamp-2 text-sm font-semibold text-text transition-colors hover:text-primary"
          >
            {board.title}
          </Link>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted opacity-100 transition-all hover:bg-white/[0.08] hover:text-text sm:opacity-0 sm:group-hover:opacity-100 data-[state=open]:opacity-100"
                aria-label="Board options"
                disabled={deleting}
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={4}
                className="z-50 min-w-[180px] overflow-hidden rounded-xl border border-white/[0.1] bg-bg-secondary p-1 shadow-elevated"
              >
                <DropdownMenu.Item asChild>
                  <Link
                    to={`/boards/${board.id}`}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-text outline-none transition-colors hover:bg-white/[0.08] data-[highlighted]:bg-white/[0.08]"
                  >
                    <ExternalLink className="h-4 w-4 text-text-muted" />
                    Go to board
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="my-1 h-px bg-white/[0.08]" />

                <DropdownMenu.Item
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger outline-none transition-colors hover:bg-danger/10 data-[highlighted]:bg-danger/10"
                  onSelect={(event) => {
                    event.preventDefault()
                    setConfirmOpen(true)
                  }}
                  disabled={deleting}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete board
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className="mb-auto">
          <p className="mb-2 text-xs font-medium text-text-muted">Members</p>
          <AvatarGroup members={members} />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-text-muted">Progress</span>
            <span className="font-semibold text-text">{board.progressPercent}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${board.progressPercent}%` }}
            />
          </div>
          {board.taskCount > 0 && (
            <p className="mt-2 text-xs text-text-muted">
              {board.doneCount} of {board.taskCount} tasks completed
            </p>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this board?"
        description={`Are you sure you want to remove or delete "${board.title}"? This action cannot be undone.`}
        confirmLabel="Yes, delete board"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </>
  )
}

export default BoardCard
