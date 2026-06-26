import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Sparkles, Trash2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import AISuggestionPanel from './AISuggestionPanel'
import { suggestTask } from '../../api/ai'
import { PRIORITY, TASK_STATUS, TASK_STATUS_LABELS } from '../../utils/constants'
import { toDateInputValue } from '../../utils/formatters'
import { applyEstimatedEffortSuggestion } from '../../utils/effort'
import { getApiErrorMessage } from '../../utils/apiErrors'

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-bg-secondary/80 px-4 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${
    hasError
      ? 'border-danger/50 focus:border-danger/50'
      : 'border-white/[0.1] focus:border-primary/50'
  }`

const priorities = [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH]
const statuses = [TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE]

function taskToFormValues(task) {
  if (!task) {
    return {
      title: '',
      description: '',
      priority: PRIORITY.MEDIUM,
      status: TASK_STATUS.TODO,
      dueDate: '',
      estimatedEffort: '',
    }
  }

  return {
    title: task.title ?? '',
    description: task.description ?? '',
    priority: task.priority ?? PRIORITY.MEDIUM,
    status: task.status ?? TASK_STATUS.TODO,
    dueDate: toDateInputValue(task.dueDate),
    estimatedEffort: task.estimatedEffort ?? '',
  }
}

function TaskDetailDialog({ task, open, onOpenChange, onUpdate, onDelete }) {
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [suggesting, setSuggesting] = useState(false)
  const [suggestion, setSuggestion] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: taskToFormValues(task),
  })

  const title = watch('title')

  useEffect(() => {
    if (open && task) {
      reset(taskToFormValues(task))
      setConfirmDelete(false)
      setSuggestion(null)
    }
  }, [open, task, reset])

  const handleClose = (nextOpen) => {
    if (!nextOpen) {
      reset(taskToFormValues(null))
      setConfirmDelete(false)
      setSuggestion(null)
    }
    onOpenChange(nextOpen)
  }

  const handleSuggest = async () => {
    const trimmedTitle = title?.trim()
    if (!trimmedTitle) {
      toast.error('Enter a title before requesting an AI suggestion')
      return
    }

    setSuggesting(true)
    setSuggestion(null)
    try {
      const result = await suggestTask({
        title: trimmedTitle,
        description: watch('description')?.trim() || '',
      })
      setSuggestion(result)
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to get AI suggestion'))
    } finally {
      setSuggesting(false)
    }
  }

  const handleAcceptSuggestion = () => {
    if (!suggestion) return

    if (suggestion.suggestedDueDate) {
      setValue('dueDate', toDateInputValue(suggestion.suggestedDueDate))
    }

    let message = 'Suggestion applied'
    if (suggestion.estimatedEffort) {
      const { value, converted, original } = applyEstimatedEffortSuggestion(
        suggestion.estimatedEffort,
      )
      if (value) {
        setValue('estimatedEffort', value)
        if (converted) {
          message = `Applied — effort saved as ${value} (from "${original}")`
        }
      } else {
        message = `Due date applied. Effort "${original}" could not be saved.`
      }
    }

    setSuggestion(null)
    toast.success(message)
  }

  const onSubmit = async (values) => {
    if (!task) return

    setSubmitting(true)
    try {
      await onUpdate(task.id, {
        title: values.title.trim(),
        description: values.description?.trim() || '',
        priority: values.priority,
        status: values.status,
        dueDate: values.dueDate || null,
        estimatedEffort: values.estimatedEffort?.trim() || '',
      })
      toast.success('Task updated')
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update task'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!task) return

    setDeleting(true)
    try {
      await onDelete(task.id)
      toast.success('Task deleted')
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to delete task'))
    } finally {
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  if (!task) return null

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/[0.1] bg-bg-secondary p-6 shadow-elevated focus:outline-none">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-bold text-text">Edit Task</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-text-secondary">
                Update details or delete this task.
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
              <div className="mb-2 flex items-center justify-between gap-2">
                <label htmlFor="edit-task-title" className="text-sm font-medium text-text-secondary">
                  Title
                </label>
                <button
                  type="button"
                  onClick={handleSuggest}
                  disabled={suggesting || submitting || deleting}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 disabled:opacity-60"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {suggesting ? 'Suggesting…' : 'AI Suggest Estimate'}
                </button>
              </div>
              <input
                id="edit-task-title"
                type="text"
                placeholder="Task title"
                className={`${inputClass(errors.title)} h-11`}
                {...register('title', {
                  required: 'Title is required',
                  minLength: { value: 2, message: 'Title must be at least 2 characters' },
                })}
              />
              {errors.title && (
                <p className="mt-1.5 text-xs text-danger">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="edit-task-description" className="mb-2 block text-sm font-medium text-text-secondary">
                Description
              </label>
              <textarea
                id="edit-task-description"
                rows={3}
                placeholder="Description"
                className={`${inputClass(false)} resize-none py-3`}
                {...register('description')}
              />
            </div>

            {(suggestion || suggesting) && (
              <AISuggestionPanel
                suggestion={suggestion}
                loading={suggesting}
                onAccept={handleAcceptSuggestion}
                onIgnore={() => setSuggestion(null)}
              />
            )}

            <div>
              <span className="mb-2 block text-sm font-medium text-text-secondary">Status</span>
              <div className="grid grid-cols-3 gap-2">
                {statuses.map((status) => (
                  <label key={status} className="cursor-pointer">
                    <input
                      type="radio"
                      value={status}
                      className="peer sr-only"
                      {...register('status')}
                    />
                    <span className="flex h-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05] px-1 text-center text-xs text-text-secondary transition-colors peer-checked:border-primary/50 peer-checked:bg-primary/10 peer-checked:text-text">
                      {TASK_STATUS_LABELS[status]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium text-text-secondary">Priority</span>
              <div className="grid grid-cols-3 gap-2">
                {priorities.map((level) => (
                  <label key={level} className="cursor-pointer">
                    <input
                      type="radio"
                      value={level}
                      className="peer sr-only"
                      {...register('priority')}
                    />
                    <span className="flex h-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05] text-sm capitalize text-text-secondary transition-colors peer-checked:border-primary/50 peer-checked:bg-primary/10 peer-checked:text-text">
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="edit-task-due-date" className="mb-2 block text-sm font-medium text-text-secondary">
                Due date
              </label>
              <input
                id="edit-task-due-date"
                type="date"
                className={`${inputClass(false)} h-11`}
                {...register('dueDate')}
              />
            </div>

            <div>
              <label htmlFor="edit-task-effort" className="mb-2 block text-sm font-medium text-text-secondary">
                Estimated effort
              </label>
              <input
                id="edit-task-effort"
                type="text"
                placeholder="e.g. 4 Hours"
                className={`${inputClass(false)} h-11`}
                {...register('estimatedEffort')}
              />
            </div>

            <div className="flex gap-3 pt-2">
              {confirmDelete ? (
                <>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    disabled={deleting}
                    className="h-11 flex-1 rounded-xl border border-white/[0.1] bg-white/[0.05] text-sm font-semibold text-text-secondary transition-colors hover:bg-white/[0.08] hover:text-text disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-danger text-sm font-semibold text-white transition-colors hover:bg-danger/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 className="h-4 w-4" />
                    {deleting ? 'Deleting…' : 'Confirm Delete'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    disabled={submitting || deleting}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 text-sm font-semibold text-danger transition-colors hover:bg-danger/20 disabled:opacity-60"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || deleting}
                    className="h-11 flex-1 rounded-xl bg-primary text-sm font-semibold text-white transition-all hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Saving…' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default TaskDetailDialog
