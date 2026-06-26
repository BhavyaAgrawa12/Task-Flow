import { useRef, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import toast from 'react-hot-toast'
import KanbanColumn from './KanbanColumn'
import TaskCard from './TaskCard'
import { COLUMN_CONFIG, KANBAN_COLUMNS } from '../../utils/kanban'
import { getApiErrorMessage } from '../../utils/apiErrors'

function KanbanBoard({ setTasks, tasksByStatus, onStatusChange, onTaskClick }) {
  const [activeTask, setActiveTask] = useState(null)
  const dragStartStatus = useRef(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  const handleDragStart = ({ active }) => {
    const task = findTaskInGroups(tasksByStatus, active.id)
    if (!task) return
    dragStartStatus.current = task.status
    setActiveTask(task)
  }

  const handleDragOver = ({ active, over }) => {
    if (!over) return

    setTasks((prev) => {
      const activeItem = prev.find((task) => task.id === active.id)
      if (!activeItem) return prev

      const overStatus = KANBAN_COLUMNS.includes(over.id)
        ? over.id
        : prev.find((task) => task.id === over.id)?.status

      if (!overStatus || activeItem.status === overStatus) return prev

      return prev.map((task) =>
        task.id === active.id ? { ...task, status: overStatus } : task,
      )
    })
  }

  const handleDragEnd = async ({ active }) => {
    const startStatus = dragStartStatus.current
    const activeId = active.id
    dragStartStatus.current = null
    setActiveTask(null)

    if (!startStatus) return

    let endStatus = startStatus
    setTasks((prev) => {
      const task = prev.find((item) => item.id === activeId)
      endStatus = task?.status ?? startStatus
      return prev
    })

    if (endStatus === startStatus) return

    try {
      await onStatusChange(activeId, endStatus)
    } catch (error) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeId ? { ...task, status: startStatus } : task,
        ),
      )
      toast.error(getApiErrorMessage(error, 'Failed to move task'))
    }
  }

  const handleDragCancel = () => {
    const startStatus = dragStartStatus.current
    const activeId = activeTask?.id

    if (startStatus && activeId) {
      setTasks((prev) =>
        prev.map((task) => (task.id === activeId ? { ...task, status: startStatus } : task)),
      )
    }

    dragStartStatus.current = null
    setActiveTask(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 overflow-x-auto pb-2 lg:gap-5">
        {COLUMN_CONFIG.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasksByStatus[column.id] ?? []}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}

function findTaskInGroups(groups, taskId) {
  for (const status of KANBAN_COLUMNS) {
    const match = groups[status]?.find((task) => task.id === taskId)
    if (match) return match
  }
  return null
}

export default KanbanBoard
