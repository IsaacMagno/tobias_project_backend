const { Statistic } = require('../database/models');
const { statsRefactor } = require('../helpers/statsRefactor');

const updateStatistic = async (activities) => {
  const { id } = activities[0];

  const actualStats = await Statistic.findAll({ where: { champion_id: id }, raw: true });

  const valuesToUpdate = statsRefactor(activities, actualStats);

  const valuesToArray = Object.entries(valuesToUpdate);

  valuesToArray.forEach(async (s) => {
    const [stats, value] = s
    const statsUpdated = await Statistic
      .update(
        { [stats]: [value] },
        { where: { champion_id: id } })
      .then(() => Statistic.findAll({ where: { champion_id: id }, raw: true }))

    return statsUpdated;
  })
};

module.exports = {
  updateStatistic,
};

// .then(() => Statistic.findAll({ where: { champion_id } }));
