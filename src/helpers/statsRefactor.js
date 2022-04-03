const statsCalculate = (agi, str, int, vit) => {
  const { upper, absNew, lower } = str.newValue;
  const { run, rope, bike } = agi.newValue;
  const stats = {
    strength: Math.floor(upper + absNew + lower),
    agility: Math.floor(run + rope + bike),
    inteligence: Math.floor(int.newValue),
    vitality: Math.floor(vit.newValue),
  };

  const total = Object.values(stats).reduce((p, c) => p + c, 0);
  const wisUpdate = Math.floor(total / 15);

  stats.wisdow = wisUpdate;

  return stats;
};

const statsRefactor = (activities, actualStats) => {
  const {
    kmRun,
    jumpRope,
    kmBike,
    upperLimb,
    abs,
    lowerLimb,
    meals,
    drinks,
    study,
    meditation,
    reading,
  } = activities[0];
  const { strength, agility, inteligence, vitality } = actualStats[0];

  const agi = {
    name: "agility",
    newValue: { run: kmRun / 5, rope: jumpRope / 1800, bike: kmBike / 20 },
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
    newValue: (study + meditation + reading) / 15,
    oldValue: inteligence,
  };
  const vit = {
    name: "vitality",
    newValue: (meals + drinks) / 25,
    oldValue: vitality,
  };

  const allStats = statsCalculate(agi, str, int, vit);

  return allStats;
};

module.exports = {
  statsRefactor,
};
