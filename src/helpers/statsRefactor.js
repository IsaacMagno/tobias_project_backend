const { Champion } = require("../database/models");
const championServices = require("../services//championsServices");

const handleGiveTitle = async (id, total, maxKey) => {
  const titles = {
    vitality: "Fitness",
    inteligence: "Sagaz",
    agility: "Velocista",
    strength: "Musculoso",
  };

  let sub_title = titles[maxKey] || "";

  let title;
  if (total <= 499) {
    title = `Primata ${sub_title}`;
  } else if (total <= 999) {
    title = `Gibão ${sub_title}`;
  } else if (total <= 1999) {
    title = `Orangotango ${sub_title}`;
  } else if (total <= 4999) {
    title = `Gorila ${sub_title}`;
  } else if (total <= 9999) {
    title = `Chimpanzé ${sub_title}`;
  } else {
    title = `Humano ${sub_title}`;
  }

  try {
    await Champion.update({ title }, { where: { id } });
  } catch (error) {
    console.error(`Erro ao atualizar o título do campeão ${id}:`, error);
  }
};

const handleUpdateExpBoost = async (id, wis, daystreak) => {
  try {
    const user = await Champion.findOne({ where: { id } });
    let actualDaystreak = daystreak || user.daystreak;
    let xpBoost = 0;
    let xpBoostWis = wis / 15;

    switch (true) {
      case actualDaystreak >= 7 && actualDaystreak < 14:
        xpBoost += 3;
        break;
      case actualDaystreak >= 14 && actualDaystreak < 21:
        xpBoost += 6;
        break;
      case actualDaystreak >= 21 && actualDaystreak < 28:
        xpBoost += 9;
        break;
      case actualDaystreak >= 28 && actualDaystreak < 35:
        xpBoost += 12;
        break;
      case actualDaystreak >= 35:
        xpBoost += 15;
        break;
      default:
        xpBoost += 0;
        break;
    }

    xpBoost += xpBoostWis;

    await Champion.update({ xpBoost }, { where: { id } });
  } catch (error) {
    console.error(`Erro ao atualizar o xpBoost do campeão ${id}:`, error);
  }
};

const statsCalculate = async (agi, str, int, vit, id) => {
  try {
    const { upper, absNew, lower } = str.newValue;
    const { run, rope, bike } = agi.newValue;
    const { stu, medit, read } = int.newValue;
    const { meal, drink, sleep } = vit.newValue;

    const stats = {
      strength: Math.floor(upper + absNew + lower),
      agility: Math.floor(run + rope + bike),
      inteligence: Math.floor(stu + medit + read),
      vitality: Math.floor(meal + drink + sleep),
    };

    let total = Object.values(stats).reduce((prev, curr) => prev + curr, 0);

    const wisUpdate = Math.floor(total / 15);

    await handleUpdateExpBoost(id, wisUpdate);

    stats.wisdow = wisUpdate;

    let maxKey = Object.entries(stats).reduce((acc, curr) =>
      acc[1] > curr[1] ? acc : curr
    )[0];

    total = Object.values(stats).reduce((prev, curr) => prev + curr, 0);

    await handleGiveTitle(id, total, maxKey);

    return stats;
  } catch (error) {
    console.error(`Erro ao calcular estatísticas para o campeão ${id}:`, error);
  }
};

const createStatObject = (name, newValue, oldValue) => ({
  name,
  newValue,
  oldValue,
});

const statsRefactor = async (activities, actualStats, id) => {
  try {
    const {
      kmRun,
      jumpRope,
      kmBike,
      upperLimb,
      abs,
      lowerLimb,
      meals,
      drinks,
      sleep,
      study,
      meditation,
      reading,
    } = activities[0];

    const { strength, agility, inteligence, vitality } = actualStats[0];

    const agi = createStatObject(
      "agility",
      {
        run: kmRun / 5,
        rope: jumpRope / 1800,
        bike: kmBike / 20,
      },
      agility
    );

    const str = createStatObject(
      "strength",
      {
        upper: upperLimb / 300,
        absNew: abs / 500,
        lower: lowerLimb / 300,
      },
      strength
    );

    const int = createStatObject(
      "inteligence",
      {
        stu: study / 8,
        medit: meditation / 2,
        read: reading / 3,
      },
      inteligence
    );

    const vit = createStatObject(
      "vitality",
      {
        meal: meals / 8,
        drink: drinks / 10,
        sleep: sleep / 240,
      },
      vitality
    );

    const allStats = await statsCalculate(agi, str, int, vit, id);

    return allStats;
  } catch (error) {
    console.error(
      `Erro ao refatorar estatísticas para o campeão ${id}:`,
      error
    );
  }
};

module.exports = {
  statsRefactor,
  handleUpdateExpBoost,
};
