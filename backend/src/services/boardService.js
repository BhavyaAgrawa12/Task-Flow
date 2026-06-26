import Board from "../models/Board.js";

export const createBoardsService = async({
    title,
    description,
    owner,
})=>{
    const board = await Board.create({
        title,
        description,
        owner
    });
    console.log("Owner Received:", owner);
    return board;
};


export const getBoardsService = async (owner) => {
  const boards = await Board.find({
    owner: owner,
  });

  boards.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return boards;
};


export const getBoardByIdService = async(boardId,owner)=>{
    const board = await Board.findOne({
        _id: boardId,
        owner: owner,
    });
    return board;
}

export const updateBoardService = async(boardId,owner,updateData)=>{
    const board = await Board.findOneAndUpdate(
        {
            _id: boardId,
            owner: owner
        },
        updateData,
        {
            returnDocument: 'after',
            runValidators: true,
        }
    );
    return board;
}

export const deleteBoardService = async (boardId, owner)=>{
    return await Board.findOneAndDelete({
        _id: boardId,
        owner: owner
    });
};
