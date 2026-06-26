import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { Kanban, ListTodo, Search, X } from 'lucide-react'
import { getBoards } from '../../api/boards'
import { getTasks } from '../../api/tasks'
import { TASK_STATUS_LABELS } from '../../utils/constants'
import { cn } from '../../utils/formatters'

const RECENT_KEY = 'taskflow_recent_searches'
const MAX_RECENT = 5

function getRecentSearches() {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveRecentSearch(query) {
  const trimmed = query.trim()
  if (!trimmed) return
  const recent = getRecentSearches().filter((item) => item !== trimmed)
  recent.unshift(trimmed)
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)))
}

function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [boards, setBoards] = useState([])
  const [tasks, setTasks] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!open) return

    setQuery('')
    setActiveIndex(0)

    async function load() {
      setLoading(true)
      try {
        const [boardsData, tasksData] = await Promise.all([getBoards(), getTasks()])
        setBoards(boardsData)
        setTasks(tasksData)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [open])

  const trimmed = query.trim().toLowerCase()
  const recentSearches = getRecentSearches()

  const filteredBoards = useMemo(() => {
    if (!trimmed) return boards.slice(0, 5)
    return boards.filter(
      (board) =>
        board.title.toLowerCase().includes(trimmed) ||
        board.description?.toLowerCase().includes(trimmed),
    )
  }, [boards, trimmed])

  const filteredTasks = useMemo(() => {
    if (!trimmed) return tasks.slice(0, 8)
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(trimmed) ||
        task.description?.toLowerCase().includes(trimmed),
    )
  }, [tasks, trimmed])

  const items = useMemo(() => {
    const results = [
      ...filteredBoards.map((board) => ({
        type: 'board',
        id: board.id,
        label: board.title,
        sublabel: 'Board',
        href: `/boards/${board.id}`,
      })),
      ...filteredTasks.map((task) => ({
        type: 'task',
        id: task.id,
        label: task.title,
        sublabel: TASK_STATUS_LABELS[task.status] || task.status,
        href: `/boards/${task.board}`,
      })),
    ]
    return results
  }, [filteredBoards, filteredTasks])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, items.length])

  const handleSelect = (item) => {
    if (trimmed) saveRecentSearch(trimmed)
    onOpenChange(false)
    navigate(item.href)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % Math.max(items.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((prev) => (prev - 1 + Math.max(items.length, 1)) % Math.max(items.length, 1))
    } else if (event.key === 'Enter' && items[activeIndex]) {
      event.preventDefault()
      handleSelect(items[activeIndex])
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed left-1/2 top-[6%] z-50 flex max-h-[min(560px,calc(100vh-2rem))] w-[calc(100%-1.5rem)] max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-bg-secondary shadow-elevated focus:outline-none sm:top-[12%]"
            onKeyDown={handleKeyDown}
          >
          <Dialog.Title className="sr-only">Search</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search tasks and boards
          </Dialog.Description>

          <div className="flex items-center gap-3 border-b border-white/[0.08] px-4">
            <Search className="h-4 w-4 shrink-0 text-text-muted" />
            <input
              type="search"
              placeholder="Search tasks and boards…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
              className="h-12 flex-1 bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
            />
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/[0.08] hover:text-text"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[min(360px,calc(100vh-12rem))] overflow-y-auto p-2 sm:max-h-[360px]">
            {!trimmed && recentSearches.length > 0 && (
              <div className="mb-2 px-2 pt-2">
                <p className="mb-2 text-xs font-medium text-text-muted">Recent searches</p>
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-text-secondary transition-colors hover:bg-white/[0.05] hover:text-text"
                  >
                    <Search className="h-3.5 w-3.5 shrink-0" />
                    {term}
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <p className="px-3 py-6 text-center text-sm text-text-muted">Loading…</p>
            ) : items.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-text-muted">No results found</p>
            ) : (
              <>
                {filteredBoards.length > 0 && (
                  <p className="px-3 py-2 text-xs font-medium text-text-muted">Boards</p>
                )}
                {items
                  .filter((item) => item.type === 'board')
                  .map((item) => {
                    const itemIndex = items.indexOf(item)
                    return (
                      <button
                        key={`board-${item.id}`}
                        type="button"
                        onClick={() => handleSelect(item)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                          itemIndex === activeIndex
                            ? 'bg-primary text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4)]'
                            : 'text-text-secondary hover:bg-white/[0.05] hover:text-text',
                        )}
                      >
                        <Kanban className="h-4 w-4 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      </button>
                    )
                  })}

                {filteredTasks.length > 0 && (
                  <p className="px-3 py-2 text-xs font-medium text-text-muted">Tasks</p>
                )}
                {items
                  .filter((item) => item.type === 'task')
                  .map((item) => {
                    const itemIndex = items.indexOf(item)
                    return (
                      <button
                        key={`task-${item.id}`}
                        type="button"
                        onClick={() => handleSelect(item)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                          itemIndex === activeIndex
                            ? 'bg-primary text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4)]'
                            : 'text-text-secondary hover:bg-white/[0.05] hover:text-text',
                        )}
                      >
                        <ListTodo className="h-4 w-4 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        <span
                          className={cn(
                            'shrink-0 text-xs',
                            itemIndex === activeIndex ? 'text-white/80' : 'text-text-muted',
                          )}
                        >
                          {item.sublabel}
                        </span>
                      </button>
                    )
                  })}
              </>
            )}
          </div>

          <div className="hidden border-t border-white/[0.08] px-4 py-2 text-xs text-text-muted sm:block">
            <span className="rounded border border-white/[0.1] px-1.5 py-0.5">↑↓</span> navigate{' '}
            <span className="rounded border border-white/[0.1] px-1.5 py-0.5">↵</span> select{' '}
            <span className="rounded border border-white/[0.1] px-1.5 py-0.5">esc</span> close
          </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CommandPalette
