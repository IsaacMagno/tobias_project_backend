const bcrypt = require("bcrypt");

const { Champion } = require("../database/models");

const getChampions = async (id) => {
  if (id) {
    const champion = await Champion.findOne({
      where: { id },
      include: { all: true, nested: true },
    });

    return champion;
  } else {
    const champions = await Champion.findAll({
      include: { all: true, nested: true },
    });

    return champions;
  }
};

const createChampion = async (championData) => {
  const { username, password } = championData;

  // const hash = await bcrypt.hash(password, 13);
  // championData.password = hash;
  // championData["name"] = "admin";
  // championData["bornDate"] = "00-00-0000";

  // const champion = await Champion.create(championData);

  // return champion;
  return "Criação não disponivel";
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

const updateChampionBiography = async (championData) => {};

module.exports = {
  getChampions,
  createChampion,
  validateChampionLogin,
  updateChampionBiography,
};
