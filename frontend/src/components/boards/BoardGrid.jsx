import CreateBoardCard from './CreateBoardCard'
import BoardCard from './BoardCard'

function BoardGrid({ boards, members, onCreateClick, onDeleteBoard }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      <CreateBoardCard onClick={onCreateClick} />

      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          members={members}
          onDelete={onDeleteBoard}
        />
      ))}
    </div>
  )
}

export default BoardGrid
