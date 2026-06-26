import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useBoardsOverview } from '../hooks/useBoardsOverview'
import { getApiErrorMessage } from '../utils/apiErrors'
import PageHeader from '../components/common/PageHeader'
import EmptyState from '../components/common/EmptyState'
import { BoardGridSkeleton } from '../components/common/skeletons'
import BoardGrid from '../components/boards/BoardGrid'
import CreateBoardDialog from '../components/boards/CreateBoardDialog'

function BoardsPage() {
  const { registerRefresh, registerSearch } = useOutletContext() ?? {}
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)

  const {
    boards,
    loading,
    error,
    refresh,
    searchQuery,
    setSearchQuery,
    addBoard,
    removeBoard,
  } = useBoardsOverview()

  const members = user ? [{ id: user.id, name: user.name }] : []

  useEffect(() => {
    registerRefresh?.(refresh)
  }, [registerRefresh, refresh])

  useEffect(() => {
    registerSearch?.({
      placeholder: 'Search Boards',
      value: searchQuery,
      onChange: setSearchQuery,
    })
    return () => registerSearch?.(null)
  }, [registerSearch, searchQuery, setSearchQuery])

  useEffect(() => {
    if (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load boards'))
    }
  }, [error])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Boards"
          description="Manage your project boards and track progress"
        />
        <BoardGridSkeleton />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Boards"
        description="Manage your project boards and track progress"
      />

      {boards.length === 0 ? (
        <div className="space-y-6">
          <BoardGrid
            boards={[]}
            members={members}
            onCreateClick={() => setDialogOpen(true)}
            onDeleteBoard={removeBoard}
          />
          <div className="glass-card">
            <EmptyState
              title="No boards yet"
              description="Create your first board to start organizing tasks."
            />
          </div>
        </div>
      ) : (
        <BoardGrid
          boards={boards}
          members={members}
          onCreateClick={() => setDialogOpen(true)}
          onDeleteBoard={removeBoard}
        />
      )}

      <CreateBoardDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreate={addBoard}
      />
    </div>
  )
}

export default BoardsPage
