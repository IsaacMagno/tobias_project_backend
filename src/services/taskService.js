const { Task } = require("../database/models");

const readTask = async (id) => {
  if (id) {
    return await Task.findByPk(id);
  }

  return await Task.findAll();
};

const createTask = async (taskData) => {
  const { goal } = taskData;

  const month = Math.round(goal / 12);
  const week = Math.round(goal / 52.1429);
  const actual = 0;

  taskData.month = month;
  taskData.week = week;
  taskData.actual = actual;

  return await Task.create(taskData);
};

const updateTask = async (id, taskData) => {
  const { actual } = await Task.findByPk(id);

  const actualNumber = parseInt(taskData.actual);

  taskData.actual = actual + actualNumber;

  return await Task.update(taskData, { where: { id } });
};

const deleteTask = async (id) => {
  return await Task.destroy({ where: { id } });
};

module.exports = {
  readTask,
  createTask,
  updateTask,
  deleteTask,
};
