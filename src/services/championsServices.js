const bcrypt = require("bcrypt");
const moment = require("moment");
const statsRefactor = require("../helpers/statsRefactor");

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

  const champion = await Champion.findOne({ where: { username }, raw: true });

  if (champion) {
    const isValid = await bcrypt.compare(password, champion.password);

    const today = moment();
    const lastUpdate = moment(champion.lastDaystreakUpdate);
    const yesterday = moment().subtract(1, "days");
    const beforeYesterday = moment().subtract(2, "days");

    if (
      !lastUpdate.isSame(today, "day") &&
      !lastUpdate.isSame(yesterday, "day") &&
      !lastUpdate.isSame(beforeYesterday, "day")
    ) {
      let date = moment.utc().tz("America/Sao_Paulo").format();
      await Champion.update(
        { daystreak: 1, lastDaystreakUpdate: date },
        { where: { id: champion.id } }
      );
    }

    const champUpdated = await Champion.findOne({
      where: { id: champion.id },
      include: { all: true, nested: true },
    });

    return { isValid, champUpdated };
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
  const xpBoost = championExp.xp * (actualXp.xpBoost / 100);

  const updatedXp =
    parseFloat(actualXp.xp) + parseFloat(championExp.xp) + parseFloat(xpBoost);

  const actualNv = calculateLevel(updatedXp, 35);

  return await Champion.update(
    { xp: updatedXp, level: actualNv },
    { where: { id } }
  ).then(() => Champion.findOne({ where: { id }, raw: true }));
};

const updateChampionDaystreak = async (id) => {
  try {
    const {
      dataValues: {
        statistics: {
          dataValues: { wisdow },
        },
      },
    } = await getChampions(id);

    const { daystreak, lastDaystreakUpdate, topDaystreak } =
      await Champion.findOne({
        where: { id },
        raw: true,
      });

    const today = moment();
    const lastUpdate = moment(lastDaystreakUpdate);
    const yesterday = moment().subtract(1, "days");
    const beforeYesterday = moment().subtract(2, "days");

    let newDaystreak;

    if (
      (!lastUpdate.isSame(today, "day") &&
        lastUpdate.isSame(yesterday, "day")) ||
      lastUpdate.isSame(beforeYesterday, "day")
    ) {
      newDaystreak = daystreak + 1;

      await updateChampionExp(id, { xp: 25 });
      await statsRefactor.handleUpdateExpBoost(id, wisdow, newDaystreak);
    } else if (
      !lastUpdate.isSame(today, "day") &&
      !lastUpdate.isSame(yesterday, "day")
    ) {
      newDaystreak = 1;

      await statsRefactor.handleUpdateExpBoost(id, wisdow, newDaystreak);
    } else {
      newDaystreak = daystreak;
    }

    let date = moment.utc().tz("America/Sao_Paulo").format();
    await Champion.update(
      {
        daystreak: newDaystreak,
        lastDaystreakUpdate: date,
      },
      { where: { id } }
    );

    return Champion.findOne({ where: { id }, raw: true });
  } catch (error) {
    console.error(`Erro ao atualizar o daystreak do campeão ${id}:`, error);
  }
};

const createChampion = async (championData) => {
  // const { username, password } = championData;

  // const hash = await bcrypt.hash(password, 13);
  // championData.password = hash;
  // championData["name"] = "admin";
  // championData["bornDate"] = "99-99-9999";

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
  updateChampionDaystreak,
  // updateExpBoost,
};

// const calculateXP = (nivel, limiar) => {
//   return Math.pow(nivel, 2) * limiar;
// };

// for (let nivel = 1; nivel <= 100; nivel++) {
//   if (nivel <= 10 || nivel >= 96) {
//     console.log(`Nível ${nivel}: ${calcularXP(nivel, 35)} XP`);
//   }
// }
