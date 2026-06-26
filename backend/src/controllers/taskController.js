import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  updateTaskStatusService,
} from "../services/taskService.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      estimatedEffort,
      board,
    } = req.body;

    const task = await createTaskService({
      title,
      description,
      status,
      priority,
      dueDate,
      estimatedEffort,
      board,
      owner: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Create Task Error:", error);

    if (error.message === "Board not found or access denied") {
      return res.status(404).json({
        success: false,
        message: error.message,
        errors: [],
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [],
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status, priority, board, search, sortBy, order } = req.query;

    const filters = Object.fromEntries(
      Object.entries({ status, priority, board, search }).filter(
        ([, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    const allowedSortFields = ["createdAt", "dueDate", "priority", "status"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortDirection = order === "asc" ? 1 : -1;
    const sort = { [sortField]: sortDirection };

    const tasks = await getTasksService(req.user._id, filters, sort);

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.error("Get Task Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [],
    });
  }
};
export const getTaskById = async (req, res) => {
  try {

    const { id } = req.params;

    const task = await getTaskByIdService(
      id,
      req.user._id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [],
    });

  }
};

export const updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    const task = await updateTaskService(
      id,
      req.user._id,
      req.body
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });

  } catch (error) {

    console.error(error);

    if (error.message === "Board not found or access denied") {
      return res.status(404).json({
        success: false,
        message: error.message,
        errors: [],
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [],
    });

  }
};


export const deleteTask = async (req, res) => {
  try {

    const { id } = req.params;

    const task = await deleteTaskService(
      id,
      req.user._id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: {},
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [],
    });

  }
};

export const updateTaskStatus = async (req, res) => {
  try {

    const { id } = req.params;

    const { status } = req.body;

    const task = await updateTaskStatusService(
      id,
      req.user._id,
      status
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [],
    });

  }
};