const statsCalculate = (agi, str, int, vit) => {
  const stats = {
    strength: Math.floor(str.newValue),
    agility: Math.floor(agi.newValue.run + agi.newValue.rope),
    inteligence: Math.floor(int.newValue),
    vitality: Math.floor(vit.newValue),
  }

  const total = Object.values(stats).reduce((p, c) => p + c, 0);
  const wisUpdate = Math.floor(total / 15 );

  stats.wisdow = wisUpdate;

  return stats;
}


const statsRefactor = (activities, actualStats) => {
  const { kmRun, jumpRope, pushUp, abs, meals, drinks, study, meditation, reading } = activities[0];
  const { strength, agility, inteligence, vitality } = actualStats[0];

  const agi = { name: "agility", newValue: { run: kmRun / 5, rope: jumpRope / 1800 }, oldValue: agility };
  const str = { name: "strength", newValue: (pushUp + abs) / 300, oldValue: strength };
  const int = { name: "inteligence", newValue: (study + meditation + reading) / 15, oldValue: inteligence };
  const vit = { name: "vitality", newValue: ( meals + drinks ) / 25,  oldValue: vitality };

  const allStats = statsCalculate(agi, str, int, vit)

  return allStats
}

module.exports = {
  statsRefactor,
};
