import { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useKanbanBoard } from '../hooks/useKanbanBoard'
import { getApiErrorMessage } from '../utils/apiErrors'
import EmptyState from '../components/common/EmptyState'
import { KanbanSkeleton, PageHeaderSkeleton } from '../components/common/skeletons'
import KanbanBoard from '../components/kanban/KanbanBoard'
import CreateTaskDialog from '../components/kanban/CreateTaskDialog'
import TaskDetailDialog from '../components/kanban/TaskDetailDialog'
import FilterBar from '../components/kanban/FilterBar'

function BoardDetailPage() {
  const { boardId } = useParams()
  const { registerRefresh, registerSearch } = useOutletContext() ?? {}
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const {
    board,
    tasks,
    setTasks,
    tasksByStatus,
    loading,
    error,
    refresh,
    searchQuery,
    setSearchQuery,
    addTask,
    editTask,
    removeTask,
    persistTaskStatus,
  } = useKanbanBoard(boardId)

  useEffect(() => {
    registerRefresh?.(refresh)
  }, [registerRefresh, refresh])

  useEffect(() => {
    registerSearch?.(null)
    return () => registerSearch?.(null)
  }, [registerSearch])

  useEffect(() => {
    if (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load board'))
    }
  }, [error])

  useEffect(() => {
    if (board?.title) {
      document.title = `${board.title} · TaskFlow`
    }
  }, [board?.title])

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setDetailOpen(true)
  }

  const handleDetailOpenChange = (open) => {
    setDetailOpen(open)
    if (!open) setSelectedTask(null)
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px]">
        <PageHeaderSkeleton />
        <KanbanSkeleton />
      </div>
    )
  }

  if (!board) {
    return (
      <div className="glass-card mx-auto max-w-lg p-8">
        <EmptyState
          title="Board not found"
          description="This board may have been deleted or you do not have access."
          action={
            <Link
              to="/boards"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to boards
            </Link>
          }
        />
      </div>
    )
  }

  const totalTasks = tasks.length
  const hasTasks = totalTasks > 0
  const hasFilteredResults =
    tasksByStatus.todo.length +
      tasksByStatus['in-progress'].length +
      tasksByStatus.done.length >
    0

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link
            to="/boards"
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to boards
          </Link>
          <h1 className="truncate text-xl font-bold text-text sm:text-2xl">{board.title}</h1>
          {board.description ? (
            <p className="mt-1 text-sm text-text-secondary">{board.description}</p>
          ) : (
            <p className="mt-1 text-sm text-text-secondary">
              {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-all hover:bg-primary-hover active:scale-[0.98] sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      {hasTasks && (
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          tasksByStatus={tasksByStatus}
        />
      )}

      {!hasTasks ? (
        <EmptyState
          title="No tasks yet"
          description="Create your first task to start tracking work on this board."
          action={
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <Plus className="h-4 w-4" />
              Create Task
            </button>
          }
        />
      ) : !hasFilteredResults ? (
        <EmptyState
          title="No matching tasks"
          description="Try a different search term or clear the filter."
        />
      ) : (
        <KanbanBoard
          setTasks={setTasks}
          tasksByStatus={tasksByStatus}
          onStatusChange={persistTaskStatus}
          onTaskClick={handleTaskClick}
        />
      )}

      <CreateTaskDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={addTask}
      />

      <TaskDetailDialog
        task={selectedTask}
        open={detailOpen}
        onOpenChange={handleDetailOpenChange}
        onUpdate={editTask}
        onDelete={removeTask}
      />
    </div>
  )
}

export default BoardDetailPage
