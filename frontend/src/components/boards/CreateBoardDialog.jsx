import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getApiErrorMessage } from '../../utils/apiErrors'

const inputClass = (hasError) =>
  `h-11 w-full rounded-xl border bg-bg-secondary/80 px-4 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${
    hasError
      ? 'border-danger/50 focus:border-danger/50'
      : 'border-white/[0.1] focus:border-primary/50'
  }`

function CreateBoardDialog({ open, onOpenChange, onCreate }) {
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: '', description: '' },
  })

  const handleClose = (nextOpen) => {
    if (!nextOpen) reset()
    onOpenChange(nextOpen)
  }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await onCreate({
        title: values.title.trim(),
        description: values.description?.trim() || '',
      })
      toast.success('Board created')
      reset()
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to create board'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/[0.1] bg-bg-secondary p-6 shadow-elevated focus:outline-none">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-bold text-text">
                Create New Board
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-text-secondary">
                Add a board to organize your tasks.
              </Dialog.Description>
            </div>
            <Dialog.Close
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/[0.08] hover:text-text"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="board-title" className="mb-2 block text-sm font-medium text-text-secondary">
                Board name
              </label>
              <input
                id="board-title"
                type="text"
                placeholder="Project Board"
                autoFocus
                className={inputClass(errors.title)}
                {...register('title', {
                  required: 'Board name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
              />
              {errors.title && (
                <p className="mt-1.5 text-xs text-danger">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="board-description" className="mb-2 block text-sm font-medium text-text-secondary">
                Description <span className="text-text-muted">(optional)</span>
              </label>
              <textarea
                id="board-description"
                rows={3}
                placeholder="What is this board for?"
                className={`${inputClass(false)} resize-none py-3`}
                {...register('description')}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Dialog.Close
                type="button"
                className="h-11 flex-1 rounded-xl border border-white/[0.1] bg-white/[0.05] text-sm font-semibold text-text-secondary transition-colors hover:bg-white/[0.08] hover:text-text"
              >
                Cancel
              </Dialog.Close>
              <button
                type="submit"
                disabled={submitting}
                className="h-11 flex-1 rounded-xl bg-primary text-sm font-semibold text-white transition-all hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Creating…' : 'Create Board'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateBoardDialog
