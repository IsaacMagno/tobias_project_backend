const bcrypt = require("bcrypt");
const moment = require("moment");
const statsRefactor = require("../helpers/statsRefactor");

const { Champion } = require("../database/models");

const TIMEZONE = "America/Sao_Paulo";

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

    const today = moment().tz("America/Sao_Paulo").startOf("day").format();
    const lastUpdate = moment(champion.lastDaystreakUpdate).startOf("day");

    var diff = today.diff(lastUpdate, "days");

    if (diff > 1) {
      let date = moment().tz("America/Sao_Paulo").startOf("day").format();

      if (champion.daystreakShield === 0) {
        await Champion.update(
          { daystreak: 1, lastDaystreakUpdate: date },
          { where: { id: champion.id } }
        );
      } else {
        if (diff === champion.daystreakShield) {
          await Champion.update(
            { daystreakShield: 0, lastDaystreakUpdate: date },
            { where: { id: champion.id } }
          );
        } else if (diff > champion.daystreakShield) {
          await Champion.update(
            { daystreak: 1, daystreakShield: 0, lastDaystreakUpdate: date },
            { where: { id: champion.id } }
          );
        } else {
          let daystreakShield = champion.daystreakShield - diff;
          await Champion.update(
            { daystreakShield, lastDaystreakUpdate: date },
            { where: { id: champion.id } }
          );
        }
      }
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

    const { daystreak, lastDaystreakUpdate, daystreakShield } =
      await Champion.findOne({
        where: { id },
        raw: true,
      });
    const today = moment().tz("America/Sao_Paulo").startOf("day").format();
    const lastUpdate = moment(lastDaystreakUpdate).startOf("day");

    var diff = today.diff(lastUpdate, "days");

    let newDaystreak = daystreak;
    let newDaystreakShield = daystreakShield;
    let date = moment().tz("America/Sao_Paulo").startOf("day").format();

    if (!lastUpdate.isSame(today, "day")) {
      await updateChampionExp(id, { xp: 25 });
    }

    if (diff > 1) {
      if (daystreakShield === 0) {
        newDaystreak = 1;
        await statsRefactor.handleUpdateExpBoost(id, wisdow, newDaystreak);
      } else {
        if (diff === daystreakShield) {
          newDaystreakShield = 0;
          newDaystreak += 1;
          await statsRefactor.handleUpdateExpBoost(id, wisdow, newDaystreak);
        } else if (diff > daystreakShield) {
          newDaystreakShield = 0;
          newDaystreak = 1;
          await statsRefactor.handleUpdateExpBoost(id, wisdow, newDaystreak);
        } else {
          newDaystreakShield -= diff;
          newDaystreak += 1;
          await statsRefactor.handleUpdateExpBoost(id, wisdow, newDaystreak);
        }
      }
      await Champion.update(
        {
          daystreak: newDaystreak,
          daystreakShield: newDaystreakShield,
          lastDaystreakUpdate: date,
        },
        { where: { id } }
      );
    } else if (!lastUpdate.isSame(today, "day")) {
      newDaystreak += 1;
      await Champion.update(
        { daystreak: newDaystreak, lastDaystreakUpdate: date },
        { where: { id } }
      );
    }

    return Champion.findOne({ where: { id }, raw: true });
  } catch (error) {
    console.error(`Erro ao atualizar o daystreak do campeão ${id}:`, error);
    throw error;
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
