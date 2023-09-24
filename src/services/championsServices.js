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

const validateChampionLogin = async (championData) => {
  const { username, password } = championData;

  const champion = await Champion.findOne({ where: { username } });

  if (champion) {
    const isValid = await bcrypt.compare(password, champion.password);

    return isValid;
  }

  return false;
};

const updateChampionBiography = async (id, { bio }) => {
  return await Champion.update({ biography: bio }, { where: { id } }).then(() =>
    Champion.findOne({ where: { id }, raw: true })
  );
};

const calculateLevel = (xp, limiar) => {
  return Math.floor(Math.sqrt(xp / limiar));
};

const updateChampionExp = async (id, championExp) => {
  const actualXp = await Champion.findOne({ where: { id }, raw: true });
  const updatedXp = parseFloat(actualXp.xp) + parseFloat(championExp.xp);

  const actualNv = calculateLevel(updatedXp, 35);

  return await Champion.update(
    { xp: updatedXp, level: actualNv },
    { where: { id } }
  ).then(() => Champion.findOne({ where: { id }, raw: true }));
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

module.exports = {
  getChampions,
  createChampion,
  validateChampionLogin,
  updateChampionBiography,
  updateChampionExp,
};

// const calculateXP = (nivel, limiar) => {
//   return Math.pow(nivel, 2) * limiar;
// };

// for (let nivel = 1; nivel <= 100; nivel++) {
//   if (nivel <= 10 || nivel >= 96) {
//     console.log(`Nível ${nivel}: ${calcularXP(nivel, 35)} XP`);
//   }
// }
