import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTasksList } from '../hooks/useTasksList'
import { getApiErrorMessage } from '../utils/apiErrors'
import PageHeader from '../components/common/PageHeader'
import EmptyState from '../components/common/EmptyState'
import TaskDetailDialog from '../components/kanban/TaskDetailDialog'
import TaskFilters from '../components/tasks/TaskFilters'
import TaskListItem from '../components/tasks/TaskListItem'
import TaskListSkeleton from '../components/tasks/TaskListSkeleton'

function TasksPage() {
  const { registerRefresh, registerSearch } = useOutletContext() ?? {}
  const [selectedTask, setSelectedTask] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const {
    tasks,
    boardMap,
    loading,
    error,
    refresh,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    editTask,
    removeTask,
  } = useTasksList()

  useEffect(() => {
    registerRefresh?.(refresh)
  }, [registerRefresh, refresh])

  useEffect(() => {
    registerSearch?.({
      placeholder: 'Search Tasks',
      value: searchQuery,
      onChange: setSearchQuery,
    })
    return () => registerSearch?.(null)
  }, [registerSearch, searchQuery, setSearchQuery])

  useEffect(() => {
    if (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load tasks'))
    }
  }, [error])

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setDetailOpen(true)
  }

  const handleDetailOpenChange = (open) => {
    setDetailOpen(open)
    if (!open) setSelectedTask(null)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Tasks" description="All tasks across your boards" />

      <div className="mb-5">
        <TaskFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
        />
      </div>

      {loading ? (
        <TaskListSkeleton />
      ) : tasks.length === 0 ? (
        <div className="glass-card p-4 sm:p-8">
          <EmptyState
            title="No tasks found"
            description={
              searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Create tasks on a board to see them here.'
            }
            action={
              !searchQuery && statusFilter === 'all' && priorityFilter === 'all' ? (
                <Link
                  to="/boards"
                  className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Go to boards
                </Link>
              ) : null
            }
          />
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              boardTitle={boardMap[task.board]?.title}
              onClick={handleTaskClick}
            />
          ))}
        </div>
      )}

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

export default TasksPage
