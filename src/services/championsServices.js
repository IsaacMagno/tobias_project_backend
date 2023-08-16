const bcrypt = require("bcrypt");

const { Champion } = require("../database/models");

const getAll = async () => {
  const champions = await Champion.findAll({
    include: { all: true, nested: true },
  });

  return champions;
};

const createChampion = async (championData) => {
  // const { username, password } = championData;

  // Criar função
  // const hash = await bcrypt.hash(password, 13);

  // championData.password = hash;

  // championData["name"] = "Antonio";
  // championData["bornDate"] = "04-11-1997";

  // console.log(championData);
  // const champion = await Champion.create(championData);

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

module.exports = {
  getAll,
  createChampion,
  validateChampionLogin,
};
