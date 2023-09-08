const { Task } = require("../database/models");

const readTask = async (id) => {
  if (id) {
    return await Task.findByPk(id);
  }

  return await Task.findAll();
};

const createTask = async (taskData) => {
  let month;
  let week;
  let day;
  let actual;

  const { goal, type } = taskData;

  if (type.toLowerCase() === "anual") {
    month = (goal / 12).toFixed(2);
    week = (goal / 52.1429).toFixed(2);
    day = (goal / 365.25).toFixed(2);
    actual = 0;
  } else if (type.toLowerCase() === "mensal") {
    month = goal;
    week = (goal / 4.34524).toFixed(2);
    day = (goal / 30.4167).toFixed(2);
    actual = 0;
  } else if (type.toLowerCase() === "semanal") {
    month = 0;
    week = goal;
    day = (goal / 7).toFixed(2);
    actual = 0;
  } else if (type.toLowerCase() === "diario") {
    month = 0;
    week = 0;
    day = goal;
    actual = 0;
  }

  taskData.month = month;
  taskData.week = week;
  taskData.daily = day;
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
