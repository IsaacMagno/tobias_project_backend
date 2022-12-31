const bcrypt = require("bcrypt");

const { Champion } = require("../database/models");

const getAll = async () => {
  const champions = await Champion.findAll({
    include: { all: true, nested: true },
  });

  return champions;
};

const createChampion = async (championData) => {
  const { username, password } = championData;

  const hash = await bcrypt.hash(password, 13);

  return "Criação não disponivel";

  // const champion = await Champion.create(championData);
};

const validateChampionLogin = async (championData) => {
  const { username, password } = championData;

  const champion = await Champion.findOne({ where: { username } });

  if (champion) {
    const isValid = await bcrypt.compare(password, champion.password);

    return isValid;
  }

  return false;
};

module.exports = {
  getAll,
  createChampion,
  validateChampionLogin,
};
