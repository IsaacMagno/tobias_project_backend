const { Champion } = require("../database/models");

const getAll = async () => {
  const champions = await Champion.findAll({
    include: { all: true, nested: true },
  });

  return champions;
};

module.exports = {
  getAll,
};
