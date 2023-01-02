const taskService = require("../services/taskService");

const readTask = async (req, res) => {
  try {
    const task = await taskService.readTask(req.params.id);

    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createTask = async (req, res) => {
  try {
    const taskData = req.body;

    const createdTask = await taskService.createTask(taskData);

    return res.status(200).json({ createdTask });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = req.body;

    const updatedTask = await taskService.updateTask(id, taskData);

    return res.status(200).json({ updatedTask });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await taskService.deleteTask(id);

    return res.status(200).json({ deletedTask });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  readTask,
  createTask,
  updateTask,
  deleteTask,
};
