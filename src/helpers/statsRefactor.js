const { Champion } = require("../database/models");

const handleGiveTitle = async (id, total, maxKey) => {
  let sub_title = "";

  if (maxKey === "vitality") {
    sub_title += "Fitness";
  } else if (maxKey === "inteligence") {
    sub_title += "Sagaz";
  } else if (maxKey === "agility") {
    sub_title += "Velocista";
  } else if (maxKey === "strength") {
    sub_title += "Musculoso";
  }

  if (total >= 500 && total < 999) {
    await Champion.update({ title: `Gibão ${sub_title}` }, { where: { id } });
  } else if (total >= 1000 && total < 1999) {
    await Champion.update(
      { title: `Orangotango ${sub_title}` },
      { where: { id } }
    );
  } else if (total >= 2000 && total < 4999) {
    await Champion.update({ title: `Gorila ${sub_title}` }, { where: { id } });
  } else if (total >= 5000 && total < 9999) {
    await Champion.update(
      { title: `Chimpanzé ${sub_title}` },
      { where: { id } }
    );
  } else if (total >= 10000) {
    await Champion.update({ title: `Humano ${sub_title}` }, { where: { id } });
  }
};

const statsCalculate = async (agi, str, int, vit, id) => {
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

  let maxKey = Object.entries(stats).reduce((acc, curr) =>
    acc[1] > curr[1] ? acc : curr
  )[0];

  const total = Object.values(stats).reduce((prev, curr) => prev + curr, 0);

  await handleGiveTitle(id, total, maxKey);

  const wisUpdate = Math.floor(total / 15);

  stats.wisdow = wisUpdate;

  return stats;
};

const statsRefactor = async (activities, actualStats, id) => {
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

  const agi = {
    name: "agility",
    newValue: {
      run: kmRun / 5,
      rope: jumpRope / 1800,
      bike: kmBike / 20,
    },
    oldValue: agility,
  };
  const str = {
    name: "strength",
    newValue: {
      upper: upperLimb / 300,
      absNew: abs / 500,
      lower: lowerLimb / 300,
    },
    oldValue: strength,
  };
  const int = {
    name: "inteligence",
    newValue: {
      stu: study / 8,
      medit: meditation / 2,
      read: reading / 3,
    },
    oldValue: inteligence,
  };
  const vit = {
    name: "vitality",
    newValue: {
      meal: meals / 8,
      drink: drinks / 10,
      sleep: sleep / 240,
    },
    oldValue: vitality,
  };

  const allStats = await statsCalculate(agi, str, int, vit, id);

  return allStats;
};

module.exports = {
  statsRefactor,
};
