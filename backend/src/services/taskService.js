import Task from "../models/Task.js";
import Board from "../models/Board.js";

export const createTaskService = async({
    title,
    description,
    status,
    priority,
    dueDate,
    estimatedEffort,
    board,
    owner,
}) =>{
    const existingBoard = await Board.findOne({
        _id: board,
        owner,
    });
    if (!existingBoard) {
        throw new Error ("Board not found or access denied");
    }
    const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        estimatedEffort,
        board,
        owner,
    });

    return task;
};

export const getTasksService = async (
  owner,
  filters = {},
  sort = { createdAt: -1 }
) => {
  const query = {
    owner,
  };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  if (filters.board) {
    query.board = filters.board;
  }

  if (filters.search) {
    query.title = {
      $regex: filters.search,
      $options: "i",
    };
  }

  const tasks = await Task.find(query)
    .populate("board", "title")
    .sort(sort);

  return tasks;
};

export const getTaskByIdService = async(taskId, owner)=>{
    const task = await Task.findOne({
        _id: taskId,
        owner,
    }).populate("board","title description");

    return task;
};

export const updateTaskService = async(taskId,owner,updateData)=>{

    if(updateData.board){
        const existingBoard = await Board.findOne({
            _id: updateData.board,
            owner,
        });
        if(!existingBoard){
            throw new Error ("Board not found or access denied");
        }
    }
    const task = await Task.findOneAndUpdate(
        {
            _id: taskId,
            owner,
        },
        updateData,
        {
            returnDocument: "after",
            runValidators: true,
        }

    ).populate("board","title");
    return task;
};

export const deleteTaskService = async (taskId, owner) => {
  return await Task.findOneAndDelete({
    _id: taskId,
    owner,
  });
};

export const updateTaskStatusService = async (taskId, owner, status) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      owner,
    },
        {
            status,
        },
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
    return task;
}